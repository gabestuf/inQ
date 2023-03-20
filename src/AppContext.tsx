import { createContext } from "react";

const local = "http://localhost:3000/inq";
const build = "https://gabestuf.com/inq";

export const AppContext = createContext<{ url: string }>({ url: build });
