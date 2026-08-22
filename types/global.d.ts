interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
  value: string;
}

interface Question {
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  upVotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}
