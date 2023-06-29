export interface iUser {
  id: number;
  username: string;
  fullName: string;
  cpf: string;
  email: string;
  avatarPieces: string;
  confirmed: boolean;
  blocked: boolean;
  title: string;
  role: string;
  business: string;
}

export interface iSurvey {
  id: number;
  slug: string;
  name: string;
  dimensions: iDimension[];
  questionsInfo: { total: number; answered: number };
  report: string | null;
}

export interface iDimension {
  id: number;
  name: string;
}

export interface iUserArray {
  admin: iUser[];
  manager: iUser[];
  employer: iUser[];
}

export interface iUserContext {
  users: iUserArray;
  setUsers: React.Dispatch<React.SetStateAction<iUserArray>>;
  populateUsers: () => void;
}

export interface iSurveyContext {
  surveys: iSurvey[];
  setSurveys: React.Dispatch<React.SetStateAction<iSurvey[]>>;
  populateSurveys: () => void;
  survey: iSurvey;
  setSurvey: React.Dispatch<React.SetStateAction<iSurvey>>;
}

export interface iChildren {
  children: React.ReactNode;
}

export interface iUserSearch {
  searchUser: string;
  setSearchUser: React.Dispatch<React.SetStateAction<string>>;
}

export interface iUserFilter {
  filterUser: string;
  setFilterUser: React.Dispatch<React.SetStateAction<string>>;
}

export interface iSurveyWithAsnwers {
  department: string;
  order: number;
  id: number;
  text: string;
  help: null;
  house: string;
  points: number;
  always: {
    A: {
      text: string;
      value: string;
    };
    B: {
      text: string;
      value: string;
    };
  };
  sometimes: {
    A: {
      text: string;
      value: string;
    };
    B: {
      text: string;
      value: string;
    };
  };
  survey: number;
  dimension: number;
  answer: string;
}

export interface iLoginRequest {
  identifier:string,
  password:string
}