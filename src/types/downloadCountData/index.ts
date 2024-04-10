export type DataItem = {
  uniqueID: {
    timeStamp: number;
  };
}

export type TransformedDataItem = Date[];

export type FirebaseDataType = {
  data: DataItem[];
}
