# My Movie

영화 정보 사이트  
https://jeonga-yeon.github.io/my-movie/
<br />
<br />

## 주요 기능

✅ 메인 화면  
배너에는 가장 인기 있는 영화의 포스터가 보여지고  
각 카테고리별로 영화와 티비 쇼의 정보가 슬라이드로 보여진다.
![moviemain](https://user-images.githubusercontent.com/76932302/217265239-14889760-964b-4091-a5b0-42f7c7c5c5de.gif)

✅ 영화 및 티비 쇼 상세 페이지  
상세 정보를 볼 수 있고 댓글과 관련 영화 및 티비쇼를 볼 수 있다.
![detail1](https://user-images.githubusercontent.com/76932302/217268229-c93d17ad-0211-4178-87a1-3f8febc11833.gif)

관련 영화를 누르면 상세 페이지로 넘어갈 수 있다.
![detail2](https://user-images.githubusercontent.com/76932302/217269486-5009802f-7e56-42d7-b6b7-174587437e58.gif)

✅ 영화 페이지  
영화를 인기순, 날짜, 제목의 알파벳 순으로 정렬할 수 있다.  
기본적으로 인기순으로 정렬되어 있다.

![movie1](https://user-images.githubusercontent.com/76932302/217271462-dad3525b-d2b2-473c-ad2c-83f0e9a49a0f.gif)

장르별로 필터링 할 수 있다.

![movie2](https://user-images.githubusercontent.com/76932302/217272662-468c85f3-ff86-4450-9d41-09eaccb41600.gif)

각 영화의 카드를 누르면 상세 페이지로 이동한다.

![movie3](https://user-images.githubusercontent.com/76932302/217273441-251ed1c0-538c-4660-a659-712f17fceedc.gif)

✅ 티비 쇼 페이지  
영화 페이지와 같은 기능을 가지고 있다.

![tvshow](https://user-images.githubusercontent.com/76932302/217275020-f938bcef-c3d1-4833-92dd-747faa800d7e.gif)

✅ 영화 및 티비 쇼 검색  
검색어를 입력하면 영화와 티비 쇼에서 각각 검색 결과를 얻을 수 있다.

![moviesearch](https://user-images.githubusercontent.com/76932302/217275954-5d7b41cb-8bfc-458c-911c-0379b7c6f746.gif)

<br />

## 문제 해결

1. createSlice에서 reducer를 사용할 때 에러 발생

   ```
   export const sortMovies = (value) => {
     return (dispatch) => {
     dispatch(sortReducer(value));
    };
   };
   ```

   이렇게 sortReducer를 dispatch 하는 과정이 필요한데 그 과정을 생략하고

   ```
   export const { sortReducer } = filteredMovies.actions;
   ```

   sortReducer를 내보내기만 했던 게 원인

   <br />

2. 장르별 필터링 시 장르를 두 번 클릭해야 필터링 되는 문제

   ```
   useEffect(() => {
    dispatch(sortMovies(moviesByGenre));
   }, [moviesByGenre]);

   ```

   useEffect를 통해 moviesByGenre라는 변수가 변할 때마다 dispatch 되도록 하였다.

<br />

## 파일구조

    - src
      - components
        - Banner.js
        - Filter.js
        - Loading.js
        - MovieCard.js
        - MoviePageCard.js
        - MovieSlide.js
        - Navigation.js
        - Sort.js
        - TvCard.js
        - TvFilter.js
        - TvPageCard.js
        - TvSlide.js
        - TvSort.js
      - pages
        - Home.js
        - MovieDetail.js
        - Movies.js
        - Search.js
        - TvShowDetail.js
        - TvShows.js
      - redux
        - modules
          - genreMovieSlice.js
          - genreTvSlice.js
          - movieDetailSlice.js
          - movieFilteringSlice.js
          - movieSlice.js
          - searchSlice.js
          - tvDetailSlice.js
          - tvFilteringSlice.js
          - tvShowSlice.js
        - api.js
        - store.js
      - App.js
      - index.tsx

<br />

## 사용 기술

```
React, Redux, axios, styled-components
```

<br />
