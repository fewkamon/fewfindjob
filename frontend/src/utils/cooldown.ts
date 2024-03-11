import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const pushAfter3Seconds = (router: AppRouterInstance, path: string) => {
  setTimeout(() => {
    router.push(path);
  }, 2500);
};

export default pushAfter3Seconds