'use strict'
import { NodeCG } from 'nodecg-types/types/server'
import livesplitCore from "livesplit-core"
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { Stream } from '@/types/replicant';
import { convertHMStoSeconds, convertHMtoSeconds } from '@/utils';
import _ from 'lodash';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { onDayChangeData, onRunnerInfoChangeData } from '@/types';
dayjs.extend(customParseFormat)

let timer: livesplitCore.Timer;

module.exports = async function (nodecg: NodeCG) {
  // ---------- Spreadsheet row names
  const ID = "ID"
  const RUNNER_NAME = "走者名"
  const START_TIME = "開始時間"
  const END_TIME = "終了時間"
  const GAME_NAME = "ゲーム名"
  const CATEGORY_NAME = "カテゴリ名"
  const TWITCH_NAME = "Twitch"
  const COMMENTATOR_NAME = "実況者"
  const PERIOD_TIME = "EST"

  // ---------- Replicants
  const allStreams = nodecg.Replicant<Stream[]>("allStreams")
  const currentStreams = nodecg.Replicant<(Stream | null)[]>("currentStreams")
  currentStreams.value = Array(4).fill(0).map((_zerofill, idx) => {
    if (!currentStreams.value[idx]) return null
    else return (_.cloneDeep(currentStreams.value[idx]))
  })
  const day1Streams = nodecg.Replicant<Stream[]>("day1Streams")
  const day2Streams = nodecg.Replicant<Stream[]>("day2Streams")
  const backupStreams = nodecg.Replicant<Stream[]>("backupStreams")
  const currentDay = nodecg.Replicant<"day1" | "day2">("currentDay")

  // ---------- Functions
  function getStreamsFromSheet(rows: GoogleSpreadsheetRow[]) {
    return rows.map(row => {
      const periodTime = row[PERIOD_TIME] ?? "0:00:00"
      const remainingSeconds = convertHMStoSeconds(periodTime)

      return {
        runnerId: row[ID],
        runnerName: row[RUNNER_NAME],
        categoryName: row[CATEGORY_NAME],
        commentatorName: row[COMMENTATOR_NAME],
        gameName: row[GAME_NAME],
        remainingSeconds,
        startTimeInString: row[START_TIME],
        twitchName: row[TWITCH_NAME],
      } as Stream
    })
  }

  // ----------
  const doc = new GoogleSpreadsheet(import.meta.env.VITE_SPREADSHEET_ID);
  doc.useApiKey(import.meta.env.VITE_SPREADSHEET_API_KEY);

  await doc.loadInfo();
  console.log("Successfully loaded spreadsheet:", doc.title);

  const day1Sheet = doc.sheetsById[import.meta.env.VITE_SHEET_RUNNER_INFO_DAY1_ID]
  const day2Sheet = doc.sheetsById[import.meta.env.VITE_SHEET_RUNNER_INFO_DAY2_ID]
  const backupSheet = doc.sheetsById[import.meta.env.VITE_SHEET_RUNNER_INFO_BACKUP_ID]

  day1Streams.value = getStreamsFromSheet(await day1Sheet.getRows())
  day2Streams.value = getStreamsFromSheet(await day2Sheet.getRows())
  backupStreams.value = getStreamsFromSheet(await backupSheet.getRows())

  switch (currentDay.value) {
    case "day1":
      allStreams.value = _.cloneDeep([...day1Streams.value, ...backupStreams.value])
      break
    case "day2":
      allStreams.value = _.cloneDeep([...day2Streams.value, ...backupStreams.value])
      break
  }

  // ---------- Listeners

  /**
   * 走者変更イベント
   * 現在選択している配信の、該当枠の走者情報を変更する
   */
  nodecg.listenFor("onRunnerInfoChange", (v: onRunnerInfoChangeData) => {
    const runnerInfoIdx = allStreams.value.findIndex(s => s.runnerId === v.runnerId)
    const runnerInfo = runnerInfoIdx >= 0 ? _.cloneDeep(allStreams.value[runnerInfoIdx]) : null

    // v.position => Exposes position like LEFT_TOP, is 0
    const newCurrentStreams = currentStreams.value.map((s, idx) => idx === v.position ? runnerInfo : s )
    currentStreams.value = newCurrentStreams
  })

  /**
   * 日時変更イベント
   * 現在設定してある配信の情報をすべて消し、配信情報を読み込み直す
   */
  nodecg.listenFor("onDayChange", (v: onDayChangeData) => {
    const dayStreams: Stream[] = v.day === "day1" ? day1Streams.value : day2Streams.value;

    currentDay.value = v.day
    currentStreams.value = [null, null, null, null]

    allStreams.value = _.cloneDeep([...dayStreams, ...backupStreams.value])
  })
}
