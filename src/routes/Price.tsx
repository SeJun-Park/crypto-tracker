import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";

interface PriceProps {
    coinId : string
}

interface ICoinPriceData {
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

export default function Price() {

    const { coinId } = useOutletContext<PriceProps>();
    const { isLoading, data } = useQuery<ICoinPriceData[]>({queryKey : ["fetchCoinHistory", coinId], queryFn : fetchCoinHistory});

    const exceptData = data ?? []
    const priceData = exceptData?.map((i) => {
        return ({
            x : i.time_close,
            y : [i.open, i.high, i.low, i.close]
    })
    })

    return (
        <div id="chart">
            <ReactApexChart options={
                                        {
                                            chart: {
                                              type: 'candlestick',
                                              height: 350,
                                              toolbar : {
                                                show : false
                                              }
                                            },
                                            title: {
                                              text: `${coinId} Price Chart`,
                                              align: 'left'
                                            },
                                            xaxis: {
                                              type: 'datetime'
                                            },
                                            yaxis: {
                                              tooltip: {
                                                enabled: false
                                              }
                                            }
                                        }
                                    } series={
                                        [{
                                            data: priceData
                                          }]
                                            } 
                                            type="candlestick" height={350} />
        </div>
    )
}