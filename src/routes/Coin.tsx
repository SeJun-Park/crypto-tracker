import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Outlet, useLocation, useMatch, useNavigate, useOutletContext, useParams } from "react-router-dom"
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { FaArrowLeft } from "react-icons/fa";


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

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    }
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
`;
const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
    display: block;
    }
    background-color: ${props => props.theme.bgColor};
`;

const Button = styled.button`
    margin: 10px 0px 20px 10px;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
`

// interface ITag {
//     coin_counter: number;
//     ico_counter: number;
//     id: string;
//     name: string;
// }

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    // // tags: ITag[];
    // team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    // links: object;
    // links_extended: object;
    // whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string; 
            ath_price: number; 
            market_cap: number; 
            market_cap_change_24h: number; 
            percent_change_1h: number; 
            percent_change_1y: number; 
            percent_change_6h: number; 
            percent_change_7d: number; 
            percent_change_12h: number; 
            percent_change_15m: number; 
            percent_change_24h: number; 
            percent_change_30d: number; 
            percent_change_30m: number; 
            percent_from_price_ath: number; 
            price: number; 
            volume_24h: number; 
            volume_24h_change_24h: number; 
        }
    }
}

interface ToogleDarkType {
    toggleDark : () => void;
    isDark : boolean;
}

export default function Coin() {

    const { coinId } = useParams();
    // const location = useLocation();
    // console.log(location)
    const { state } = useLocation();
    const navigate = useNavigate();
    const { toggleDark, isDark } = useOutletContext<ToogleDarkType>();

    const { isLoading : infoIsLoading, data : infoData} = useQuery<IInfoData>({queryKey : ["fetchCoinInfo", coinId], queryFn : fetchCoinInfo})
    const { isLoading : priceIsLoading, data : priceData} = useQuery<IPriceData>({queryKey : ["fetchCoinPrice", coinId], queryFn : fetchCoinPrice,  
                                                                                                                            
                                                                                                                                refetchInterval: 5000,
                                                                                                                            })

    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    const onBtnClick = () => {
        navigate("/")
    }


    return (
        <Body>
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : infoIsLoading ? "Loading.." : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Title> {state?.name ? state.name : infoIsLoading ? "Loading.." : infoData?.name} </Title>                
                <button onClick={toggleDark}>
                    Toggle Mode
                </button>
            </Header>
            <div>
                <Button onClick={onBtnClick}>
                    <FaArrowLeft />
                </Button>
            </div>
            {infoIsLoading || priceIsLoading ? 
                (<Loader> Loading... </Loader>) : 
                (
                    <>
                        <Overview>
                            <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                            </OverviewItem>
                            <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                            <span>Price:</span>
                            <span>{priceData?.quotes.USD.price.toFixed(8)}</span>
                            </OverviewItem>
                        </Overview>
                            <Description>{infoData?.description}</Description>
                        <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{priceData?.total_supply}</span>
                        </OverviewItem>
                            <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceData?.max_supply}</span>
                            </OverviewItem>
                        </Overview>

                        <Tabs>
                            <Tab isActive={chartMatch !== null}>
                                <Link to={`/${coinId}/chart`}>Chart</Link>
                            </Tab>
                            <Tab isActive={priceMatch !== null}>
                                <Link to={`/${coinId}/price`}>Price</Link>
                            </Tab>
                        </Tabs>

                        <Outlet context={{"coinId" : coinId}} />
                    </>
                )}
        </Container>
        </Body>
    )
}