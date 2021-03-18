type BookList = {
  data: [
    {
      id: number;
      userId: number;
      noteCounts: number;
      title: string;
      createdAt: Date;
      updatedAt: Date;
      friendlyCreatedAt: string;
    }
  ];
}
type NewNotebook = {
  msg: string;
  data: {
    id: number;
    userId: number;
    noteCounts: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    friendlyCreatedAt: string;
  };
}