
import Container from "../Container";
import Robot from "../../assets/robot.png";
import Coupon from "../../assets/coupon.png";
import Credit from "../../assets/extra.png";
import Candy from "../../assets/candy.png";
import Popup from "react-popup";

export default function Reward() {
    const rewards = [
        {
            name: "Coupon",
            image: Coupon,
            points: 20,
            after: "Your voucher will be sent to your email"
        },
        {
            name: "Extra Credit",
            image: Credit,
            points: 100,
            after: "Request for extra credit will be sent to your teacher"
        },
        {
            name: "Candy",
            image: Candy,
            points: 10,
            after: "The candy will be delivered to your address"
        }
    ];

    const totalPoints = 40;


    const redeem = (index) => {
        Popup.plugins().redeemPopup(
            async () => {
                Popup.plugins().rewardPopup(
                    ()=>{
                        console.log("redeemed");
                    },
                    rewards[index]
                );
            },
        );
        console.log(index);
    }



    return (
        <Container className={"flex flex-col gap-20 justify-center items-center p-8"}>
            <div className="flex gap-20">
                <img src={Robot} alt="robot" className="h-32" />
                <div className="flex flex-col gap-6 justify-center">
                    <p className="text-5xl">Redeem Your Rewards</p>
                    <p className="text-3xl">Points: {totalPoints}</p>

                </div>
            </div>
            <div className="flex gap-20">
                {rewards.map(({ name, image, points }, index) => (
                    <button onClick={() => redeem(index)} disabled={totalPoints < points} key={index} className="rounded-2xl hover:bg-gray-100 flex flex-col text-xl text-center items-center justify-center p-5">
                        <p className={`font-bold text-2xl ${totalPoints < points && "text-gray-300"}`}>{name}</p>
                        <img src={image} alt={name} className={`h-32 mb-4 ${totalPoints < points && "grayscale opacity-25"}`} />
                        <p className={`text-xl ${totalPoints < points && "text-gray-300"}`} >{points} pts</p>
                    </button>
                ))}

            </div>
        </Container>
    );
}
