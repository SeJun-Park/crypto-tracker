import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components"
import { fetchCoins } from "../api";

const Body = styled.body`
    background-color: ${props => props.theme.bodyColor};    
    width : 100vw;
    height : 100vh;
`

const Title = styled.h1`
    font-size: 48px;
    color: ${ props => props.theme.accentColor };
`;

const Loader = styled.div`
    text-align: center;

`

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul`
`;

const Coin = styled.li`
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor}
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    
    border-radius: 15px;

    a {
        padding: 10px;
        transition: color .2s ease-in;
        display: flex;
        align-items: center;
    }

    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Img = styled.img`
    width : 35px;
    height : 35px;
    margin-right : 10px;
`

interface ICoin {
    id : string,
    name : string,
    symbol : string,
    rank : number,
    is_new : boolean,
    is_active : boolean,
    type : string
}

interface ToogleDarkType {
    toggleDark : () => void;
    isDark : boolean;
}

export default function Coins() {

    const { isLoading : coinsIsLoading, data : coinsData } = useQuery<ICoin[]>({queryKey : ["allCoins"], queryFn : fetchCoins});
    const { toggleDark, isDark } = useOutletContext<ToogleDarkType>();

    // const [ coins, setCoins ] = useState<ICoin[]>([]);
    // const [ loading, setLoading ] = useState(true);

    // useEffect(() => {
    //     (async() => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         // console.log(json)
    //         setCoins(json.slice(0, 100))
    //         setLoading(false)
    //     })();
    // }, [])

    return (
        <Body>
        <Container>
            <Helmet>
                <title>
                    코인
                </title>
            </Helmet>
            <Header>
                <Title> 코인 </Title>
                <button onClick={toggleDark}>
                    Toggle Mode
                </button>
            </Header>
            {coinsIsLoading ? 
                <Loader> Loading... </Loader> : <CoinsList>
                                    {coinsData?.slice(0,100).map((coin) => 
                                                
                                                    <Coin key={coin.id}>
                                                        <Link to={`/${coin.id}`} state={ {name : coin.name} }>
                                                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                                            {coin.name} &rarr; 
                                                        </Link>
                                                    </Coin>
                                            )}
                                </CoinsList>
            }
        </Container>
        </Body>
    )
}