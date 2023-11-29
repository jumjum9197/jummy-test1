import { CircularProgress, styled } from '@mui/material'

const CircularLoader: React.FC = () => {
  return (
    <Wrapper>
        <CircularProgress style={{ color: "#11643C",}} />
    </Wrapper>
  )
}

export default CircularLoader

const Wrapper = styled("div")`
display: flex;
align-items: center;
justify-content: center;
`;
