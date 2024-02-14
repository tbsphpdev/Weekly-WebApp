import useSWR, { useSWRConfig } from "swr";
import { ZodTypeAny } from "zod";
import { useErrorHandler } from "react-error-boundary";

import { User, userSchema } from "../types";
import { API_BASE_URLS } from "../public/constant";

// generic function to fetch data with a certain property name, URL, and schema
function useData<DataPropertyName extends string, DataType>(
  dataPropertyName: string,
  requestURL: string,
  dataSchema: ZodTypeAny
) {
  const { data, error } = useSWR<any, unknown>(requestURL);
  if (error) {
    throw error;
  }

  // const parsedData = data ? (dataSchema.parse(data) as DataType) : null;
  const parsedData = data?.data ? data?.data : null;
  return {
    [dataPropertyName]: parsedData,
  } as {
    [N in DataPropertyName]: DataType | null;
  };
}

// get the currently logged in user's data
export function useCurrentUser() {
  const { user } = useData<"user", User>(
    "user",
    `${API_BASE_URLS.baseUrl}/api/user/find-user`,
    userSchema
  );
  const { mutate } = useSWRConfig();
  const handleError = useErrorHandler();
  return {
    user,
    // optimistically update the current user's data, then revalidate it after awaiting the request
    async updateCurrentUser(
      this: void,
      optimisticData: Partial<User>,
      request: Promise<unknown>
    ) {
      mutate(
        "/api/user/find-user",
        { ...user, ...optimisticData },
        { revalidate: false }
      );
      try {
        await request;
      } catch (error) {
        handleError(error);
      }
      // Makes a request to /api/user/find-user to revalidate the user's data
      mutate("/api/user/find-user");
    },
  };
}

// get data from another user with a certain id
export function useUser(authSub: string) {
  return useData<"user", User>(
    "user",
    "/api/user/find-user?authSub=" + authSub,
    userSchema
  );
}
