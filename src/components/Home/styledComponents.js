import styled from 'styled-components'

const BackgroundMovieImage = styled.div.attrs(props => ({
  $apiStatus: props.$apiStatus,
  $posterPath: props.$posterPath,
  $backdropPath: props.$backdropPath,
}))`
  width: 100%;
  height: 90vh;
  /* Background image and gradient combination */
  background: ${props =>
    props.$apiStatus === 'SUCCESS'
      ? `linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(24, 24, 24, 0.55) 68.26%,
          #131313 90.82%,
          #131313 94.68%,
          #131313 108.68%
        ),
        url(${props.$posterPath}) center/cover no-repeat`
      : '#131313'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    height: 100vh;
    background: ${props =>
      props.$apiStatus === 'SUCCESS'
        ? `linear-gradient(
          0deg,
           #131313 0%,
            #131313 2.68%,
           #131313 8.68%,
           #131313 10.82%,
           rgba(24, 24, 24, 0.55) 42.26%,
           rgba(0, 0, 0, 0) 100%
        ), url(${props.$backdropPath}) center/cover no-repeat`
        : '#131313'};
  }
`

export default BackgroundMovieImage
