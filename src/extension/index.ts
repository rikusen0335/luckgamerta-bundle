'use strict'
import { NodeCG } from 'nodecg-types/types/server'
import livesplitCore from "livesplit-core"
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Stream } from '@/types/replicant';
import { convertHMtoSeconds } from '@/utils';
import _ from 'lodash';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
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

  // ---------- Replicants
  const allStreams = nodecg.Replicant<Stream[]>("allStreams")
  const currentStreams = nodecg.Replicant<(Stream | null)[]>("currentStreams")
  currentStreams.value = Array(4).fill(0).map((_zerofill, idx) => {
    if (!currentStreams.value[idx]) return null
    else return (_.cloneDeep(currentStreams.value[idx]))
  })

  // ----------
  const doc = new GoogleSpreadsheet(import.meta.env.VITE_SPREADSHEET_ID);
  doc.useApiKey(import.meta.env.VITE_SPREADSHEET_API_KEY);

  await doc.loadInfo();
  console.log("Successfully loaded spreadsheet:", doc.title);

  const sheet = doc.sheetsById[import.meta.env.VITE_SHEET_RUNNER_INFO_ID]
  const rows = await sheet.getRows()

  allStreams.value = rows.map(row => {
    const startTimeInSeconds = convertHMtoSeconds(row[START_TIME])
    const endTimeInSeconds = convertHMtoSeconds(row[END_TIME])
    const remainingSeconds = endTimeInSeconds - startTimeInSeconds

    return {
      runnerId: row[ID],
      runnerName: row[RUNNER_NAME],
      categoryName: row[CATEGORY_NAME],
      commentatorName: row[COMMENTATOR_NAME],
      gameName: row[GAME_NAME],
      remainingSeconds,
      startTimeInString: row[START_TIME],
      twitchName: row[TWITCH_NAME],
    }
  })

  nodecg.listenFor("onRunnerInfoChange", (v) => {
    const runnerInfoIdx = allStreams.value.findIndex(s => s.runnerId === v.runnerId)
    const runnerInfo = runnerInfoIdx >= 0 ? _.cloneDeep(allStreams.value[runnerInfoIdx]) : null

    // v.position => Exposes position like LEFT_TOP, is 0
    const newCurrentStreams = currentStreams.value.map((s, idx) => idx === v.position ? runnerInfo : s )
    currentStreams.value = newCurrentStreams
  })
}
