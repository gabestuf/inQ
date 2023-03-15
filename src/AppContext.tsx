import { createContext } from "react";

const local = "http://localhost:3000";

export const AppContext = createContext<{ url: string }>({ url: local });
