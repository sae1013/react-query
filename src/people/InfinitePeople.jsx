import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import {useInfiniteQuery} from "react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const {data,fetchNextPage,hasNextPage,isFetching,isError,error} = useInfiniteQuery(
    'sw-people',({pageParam = initialUrl}) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined  // 스타워즈 api 에는 응답데이터에 next에 다음 url 을 담아서 보내줌. //data/pages[-1] // 응답 그자체를 매개변수로 받는다.
    }
  );



  return(
    <InfiniteScroll loadMore = {fetchNextPage} hasMore = {hasNextPage}>
      {isFetching && <div className={"loading"}>Loading</div>}
      {data?.pages?.map(pageData => {
        return pageData.results.map(person => {
          return <Person key={person.name} name={person.name} hairColor={person.hair_color}></Person>
        })
      })}
    </InfiniteScroll>
  );
}

// pageParam
// 초기에는 defaultURLfh fetch를 땡기고, 다음 페이지를 fetch 할때는, getNextPageParam 에서 리턴한 값을 사용함
// 다이어그램. 다음 페이지를 fetch 할때, getNextPageParam 에서 리턴한 값을 사용함.