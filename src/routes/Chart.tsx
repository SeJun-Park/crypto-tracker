import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom"
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"

interface ChartProps {
    coinId : string
}

interface ICoinChartData {
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

export default function Chart() {

    const { coinId } = useOutletContext<ChartProps>();
    // const { isLoading, data } = useQuery<ICoinChartData[]>(["fetchCoinHistory", coinId], fetchCoinHistory);
    const { isLoading, data } = useQuery<ICoinChartData[]>({queryKey : ["fetchCoinHistory", coinId], queryFn : fetchCoinHistory});
    console.log(data)


    return (
        <div> {isLoading ? "Loading chart..." : <ApexChart 
                                                    type="line" 
                                                    series={[
                                                        // {
                                                        //     name : "hello",
                                                        //     data : [1,2,3,4,5,6]
                                                        // },
                                                        {
                                                            name : "price",
                                                            data : data?.map((price) => parseFloat(price.close)) ?? []
                                                            // ?? [] 은 null 값이 되는 걸 방지하는 코드, null일 때는 빈 배열이 되기 때문에 null일 때도 문제 없음
                                                        }
                                                    ]}
                                                    // series에 우리가 보내고 싶은 모든 data가 들어있는 것.
                                                    options={{
                                                        theme : {
                                                            mode : "light"
                                                        },
                                                        chart : {
                                                            height : 400,
                                                            width : 500,
                                                            toolbar : {
                                                                show : false
                                                                // 다운로드 등 버튼으로 구성된 상단 바 삭제.
                                                            },
                                                            background : "transparent"
                                                            // 자세한 커스텀 조건들은 docs에서 확인할 수 있음.
                                                        },
                                                        grid : {
                                                            show : false
                                                        },
                                                        stroke : {
                                                            curve : "smooth",
                                                            width : 3
                                                        },
                                                        yaxis : {
                                                            show : false
                                                        },
                                                        xaxis : {
                                                            labels : {
                                                                show : false
                                                            },
                                                            axisTicks : {
                                                                show : false
                                                            },
                                                            type : "datetime",
                                                            categories : data?.map((price) => new Date(price.time_close*1000).toISOString()) ?? []
                                                        },
                                                        fill : {
                                                            type : "gradient",
                                                            gradient : {
                                                                gradientToColors : ["#55efc4"],
                                                                stops : [0, 100]
                                                            },
                                                        },
                                                        colors : ["#74b9ff"],
                                                        tooltip : {
                                                            y : {
                                                                formatter : (value) => `$ ${value.toFixed(2)}`
                                                            }
                                                        }
                                                    }} 
                                                    
                                                    />} </div>
    )
}