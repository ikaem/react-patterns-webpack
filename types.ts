type Work = {
  name: string;
};

type MoreWork = Work & {
  lastName: string;
};

interface What extends Work {
  no: string;
}

type More = What & {
  noWay: string;
};

type Jell = More | What;

// class NewClass implements Jell {} // this does now work
