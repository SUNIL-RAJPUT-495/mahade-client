import Axios from "./axios"
import SummaryApi from "../common/SummerAPI"

export const fetchGame = async () => {
    const res = await Axios({
        url: SummaryApi.getGame.url,
        method: SummaryApi.getGame.method
    });

    // Backend `getAllGames` returns: { games: [...] }
    console.log(res?.data?.games);
    return res?.data?.games;
};

