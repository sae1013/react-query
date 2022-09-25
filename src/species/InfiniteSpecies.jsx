import InfiniteScroll from "react-infinite-scroller";
import {useInfiniteQuery} from "react-query";

import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  // console.log('fetch')
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {data,fetchNextPage,hasNextPage,isFetchingNextPage,isFetching} = useInfiniteQuery('species',({pageParam = initialUrl})=>fetchUrl(pageParam),{
    // TODO: Add Query Option
    getNextPageParam: (lastPage,allPages) =>{
      // console.log('getNextPAram')
      return lastPage.next
    }

  })

  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore = {hasNextPage}>
      {data?.pages?.map((pageData) => {
        return pageData.results.map((specie) => {
          return <Species key={specie.name} {...specie}></Species>
        })
      })}
    </InfiniteScroll>);
}

