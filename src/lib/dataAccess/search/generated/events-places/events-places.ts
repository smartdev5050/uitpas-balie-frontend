/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import {
  useQuery
} from '@tanstack/react-query'
import type {
  QueryFunction,
  QueryKey,
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
  ForbiddenResponse,
  GetEvents200,
  GetEventsParams,
  GetOffers200,
  GetOffersParams,
  GetPlaces200,
  GetPlacesParams,
  NotFoundResponse,
  UnauthorizedResponse
} from '.././model'



/**
 * Returns a paginated list of events that match the given filters.

### Repeating query parameters

Parameters that have the type `array[string]` and `[]` as a suffix in their name in the list of query parameters below can be repeated to filter on multiple values with an `AND` operator. For example:

*  `?labels[]=uitpas` to only include results that have the label `uitpas`
*  `?labels[]=uitpas&labels[]=paspartoe` to only include results that have both the labels `uitpas` and `paspartoe`

Other `array[string]` parameters without the `[]` suffix support multiple comma-separated values for `OR` filtering. For example:

*  `?workflowStatus=DRAFT` to return all results with the draft workflow status.
*  `?workflowStatus=REJECTED,DELETED` to return results with the rejected or deleted workflow status.

Add `embedCalendarSummaries` to have an extra property `calendarSummary` in the results that contains one or more formatted human-readable summaries of the date/time info of the result. See <a href="search-api/calendar-summaries">the guide about embedding the calendar summaries</a> for more details.
 * @summary Search events
 */
export const getEvents = (
    params?: GetEventsParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetEvents200>> => {
    
    return axios.get(
      `https://search-test.uitdatabank.be/events`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetEventsQueryKey = (params?: GetEventsParams,) => {
    
    return [`https://search-test.uitdatabank.be/events`, ...(params ? [params]: [])] as const;
    }

    
export const getGetEventsQueryOptions = <TData = Awaited<ReturnType<typeof getEvents>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | NotFoundResponse>>(params?: GetEventsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEvents>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetEventsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getEvents>>> = ({ signal }) => getEvents(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getEvents>>, TError, TData> & { queryKey: QueryKey }
}

export type GetEventsQueryResult = NonNullable<Awaited<ReturnType<typeof getEvents>>>
export type GetEventsQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse | NotFoundResponse>

/**
 * @summary Search events
 */
export const useGetEvents = <TData = Awaited<ReturnType<typeof getEvents>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | NotFoundResponse>>(
 params?: GetEventsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEvents>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetEventsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * Returns a paginated list of both events and places that match the given filters.

### Repeating query parameters

Parameters that have the type `array[string]` and `[]` as a suffix in their name in the list of query parameters below can be repeated to filter on multiple values with an `AND` operator. For example:

*  `?labels[]=uitpas` to only include results that have the label `uitpas`
*  `?labels[]=uitpas&labels[]=paspartoe` to only include results that have both the labels `uitpas` and `paspartoe`

Other `array[string]` parameters without the `[]` suffix support multiple comma-separated values for `OR` filtering. For example:

*  `?workflowStatus=DRAFT` to return all results with the draft workflow status.
*  `?workflowStatus=REJECTED,DELETED` to return results with the rejected or deleted workflow status.
 * @summary Search events & places (offers)
 */
export const getOffers = (
    params?: GetOffersParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetOffers200>> => {
    
    return axios.get(
      `https://search-test.uitdatabank.be/offers`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetOffersQueryKey = (params?: GetOffersParams,) => {
    
    return [`https://search-test.uitdatabank.be/offers`, ...(params ? [params]: [])] as const;
    }

    
export const getGetOffersQueryOptions = <TData = Awaited<ReturnType<typeof getOffers>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | NotFoundResponse>>(params?: GetOffersParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getOffers>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetOffersQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getOffers>>> = ({ signal }) => getOffers(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getOffers>>, TError, TData> & { queryKey: QueryKey }
}

export type GetOffersQueryResult = NonNullable<Awaited<ReturnType<typeof getOffers>>>
export type GetOffersQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse | NotFoundResponse>

/**
 * @summary Search events & places (offers)
 */
export const useGetOffers = <TData = Awaited<ReturnType<typeof getOffers>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | NotFoundResponse>>(
 params?: GetOffersParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getOffers>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetOffersQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * Returns a paginated list of places that match the given filters.

### Repeating query parameters

Parameters that have the type `array[string]` and `[]` as a suffix in their name in the list of query parameters below can be repeated to filter on multiple values with an `AND` operator. For example:

*  `?labels[]=uitpas` to only include results that have the label `uitpas`
*  `?labels[]=uitpas&labels[]=paspartoe` to only include results that have both the labels `uitpas` and `paspartoe`

Other `array[string]` parameters without the `[]` suffix support multiple comma-separated values for `OR` filtering. For example:

*  `?workflowStatus=DRAFT` to return all results with the draft workflow status.
*  `?workflowStatus=REJECTED,DELETED` to return results with the rejected or deleted workflow status.

Add `embedCalendarSummaries` to have an extra property `calendarSummary` in the results that contains one or more formatted human-readable summaries of the date/time info of the result. See <a href="search-api/calendar-summaries">the guide about embedding the calendar summaries</a> for more details.

 * @summary Search places
 */
export const getPlaces = (
    params?: GetPlacesParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetPlaces200>> => {
    
    return axios.get(
      `https://search-test.uitdatabank.be/places`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetPlacesQueryKey = (params?: GetPlacesParams,) => {
    
    return [`https://search-test.uitdatabank.be/places`, ...(params ? [params]: [])] as const;
    }

    
export const getGetPlacesQueryOptions = <TData = Awaited<ReturnType<typeof getPlaces>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | NotFoundResponse>>(params?: GetPlacesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getPlaces>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPlacesQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPlaces>>> = ({ signal }) => getPlaces(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getPlaces>>, TError, TData> & { queryKey: QueryKey }
}

export type GetPlacesQueryResult = NonNullable<Awaited<ReturnType<typeof getPlaces>>>
export type GetPlacesQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse | NotFoundResponse>

/**
 * @summary Search places
 */
export const useGetPlaces = <TData = Awaited<ReturnType<typeof getPlaces>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | NotFoundResponse>>(
 params?: GetPlacesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getPlaces>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPlacesQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

