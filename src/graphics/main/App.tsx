import { useReplicant } from '@/hooks';
import React, { type VFC } from 'react';
import credentials from "../../../credentials.json"
const { GoogleSpreadsheet } = require('google-spreadsheet');

export const App: VFC = () => {
  const [names] = useReplicant('names');
  const [scores] = useReplicant('scores');

  const loadDoc = async () => {
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
    // await doc.useServiceAccountAuth(credentials);
    // await doc.loadInfo();

    // const rtaSheet = doc.sheetsById[process.env.RTA_WORKSHEET_ID || ""];
    // const rtaRows = await rtaSheet.getRows();

    // return rtaRows
  }


  if (typeof names === 'undefined' || typeof scores === 'undefined')
    return null;

  return (
    <div>
      {/* <button onClick={() => console.log(loadDoc())}>aaa</button> */}
    </div>
  );
};
