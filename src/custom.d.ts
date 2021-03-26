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
type Note = {
  data: [
    {
      id: number;
      notebookId: number;
      userId: number;
      title: string;
      content: string;
      isDelete: boolean;
      createdAt: Date;
      updatedAt: Date;
      friendlyCreatedAt: string;
      friendlyUpdatedAt: string;
    }
  ];
}
type NewNote = {
  msg: string;
  data: {
    id: number;
    userId: number;
    title: string;
    content: string;
    isDelete: boolean;
    createdAt: Date;
    updatedAt: Date;
    friendlyCreatedAt: string;
    friendlyUpdatedAt: string;
  };
}
type State = {
  notebooks: [
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