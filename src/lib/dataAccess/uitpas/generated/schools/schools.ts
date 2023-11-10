/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import axios from 'axios'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  Error,
  ForbiddenResponse,
  Organizer,
  UnauthorizedResponse
} from '.././model'



/**
 * Retrieve the passholder's school.

The caller of this request must have `PASSHOLDERS_SEARCH` permission.

<!-- theme: warning -->

> Passholder schools are used to manage passholders in a very specific case. If you are not explicitly working with UiTPAS schools, you will probably **NOT** need this API. 

Using [GET](/reference/uitpas.json/paths/~1passholders~1{passholderId}~1school/get), [PUT](/reference/uitpas.json/paths/~1passholders~1{passholderId}~1school/put) and [DELETE](/reference/uitpas.json/paths/~1passholders~1{passholderId}~1school/delete) on this endpoint, the school of a passholder can be retrieved, updated and deleted. All schools are organizers.
 * @summary Get passholder school
 */
export const getPassholdersSchool = (
    passholderId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Organizer>> => {
    
    return axios.get(
      `https://api-test.uitpas.be/passholders/${passholderId}/school`,options
    );
  }


export const getGetPassholdersSchoolQueryKey = (passholderId: string,) => {
    
    return [`https://api-test.uitpas.be/passholders/${passholderId}/school`] as const;
    }

    
export const getGetPassholdersSchoolQueryOptions = <TData = Awaited<ReturnType<typeof getPassholdersSchool>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(passholderId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getPassholdersSchool>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPassholdersSchoolQueryKey(passholderId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPassholdersSchool>>> = ({ signal }) => getPassholdersSchool(passholderId, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(passholderId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getPassholdersSchool>>, TError, TData> & { queryKey: QueryKey }
}

export type GetPassholdersSchoolQueryResult = NonNullable<Awaited<ReturnType<typeof getPassholdersSchool>>>
export type GetPassholdersSchoolQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>

/**
 * @summary Get passholder school
 */
export const useGetPassholdersSchool = <TData = Awaited<ReturnType<typeof getPassholdersSchool>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(
 passholderId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getPassholdersSchool>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPassholdersSchoolQueryOptions(passholderId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * Update the passholder's school relation.

The caller of this request must have `PASSHOLDERS_UPDATE` permission.

<!-- theme: warning -->

> Passholder schools are used to manage passholders in a very specific case. If you are not explicitly working with UiTPAS schools, you will probably **NOT** need this API. 

Using [GET](/reference/uitpas.json/paths/~1passholders~1{passholderId}~1school/get), [PUT](/reference/uitpas.json/paths/~1passholders~1{passholderId}~1school/put) and [DELETE](/reference/uitpas.json/paths/~1passholders~1{passholderId}~1school/delete) on this endpoint, the school of a passholder can be retrieved, updated and deleted. All schools are organizers.
 * @summary Update passholder school
 */
export const putPassholdersSchool = (
    passholderId: string,
    organizer: Organizer, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    
    return axios.put(
      `https://api-test.uitpas.be/passholders/${passholderId}/school`,
      organizer,options
    );
  }



export const getPutPassholdersSchoolMutationOptions = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putPassholdersSchool>>, TError,{passholderId: string;data: Organizer}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof putPassholdersSchool>>, TError,{passholderId: string;data: Organizer}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putPassholdersSchool>>, {passholderId: string;data: Organizer}> = (props) => {
          const {passholderId,data} = props ?? {};

          return  putPassholdersSchool(passholderId,data,axiosOptions)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PutPassholdersSchoolMutationResult = NonNullable<Awaited<ReturnType<typeof putPassholdersSchool>>>
    export type PutPassholdersSchoolMutationBody = Organizer
    export type PutPassholdersSchoolMutationError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

    /**
 * @summary Update passholder school
 */
export const usePutPassholdersSchool = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putPassholdersSchool>>, TError,{passholderId: string;data: Organizer}, TContext>, axios?: AxiosRequestConfig}
) => {

      const mutationOptions = getPutPassholdersSchoolMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Delete the passholder's school relation.

The user or client performing this request must have `PASSHOLDERS_UPDATE` permission.

<!-- theme: warning -->

> Passholder schools are used to manage passholders in a very specific case. If you are not explicitly working with UiTPAS schools, you will probably **NOT** need this API. 

Using [GET](/reference/uitpas.json/paths/~1passholders~1{passholderId}~1school/get), [PUT](/reference/uitpas.json/paths/~1passholders~1{passholderId}~1school/put) and [DELETE](/reference/uitpas.json/paths/~1passholders~1{passholderId}~1school/delete) on this endpoint, the school of a passholder can be retrieved, updated and deleted. All schools are organizers.
 * @summary Delete passholder school
 */
export const deletePassholdersSchool = (
    passholderId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    
    return axios.delete(
      `https://api-test.uitpas.be/passholders/${passholderId}/school`,options
    );
  }



export const getDeletePassholdersSchoolMutationOptions = <TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deletePassholdersSchool>>, TError,{passholderId: string}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof deletePassholdersSchool>>, TError,{passholderId: string}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deletePassholdersSchool>>, {passholderId: string}> = (props) => {
          const {passholderId} = props ?? {};

          return  deletePassholdersSchool(passholderId,axiosOptions)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type DeletePassholdersSchoolMutationResult = NonNullable<Awaited<ReturnType<typeof deletePassholdersSchool>>>
    
    export type DeletePassholdersSchoolMutationError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>

    /**
 * @summary Delete passholder school
 */
export const useDeletePassholdersSchool = <TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deletePassholdersSchool>>, TError,{passholderId: string}, TContext>, axios?: AxiosRequestConfig}
) => {

      const mutationOptions = getDeletePassholdersSchoolMutationOptions(options);

      return useMutation(mutationOptions);
    }
    