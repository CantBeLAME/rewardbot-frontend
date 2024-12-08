import Container from "../Container";
import Robot from "../../assets/images/robot.png";
import Coupon from "../../assets/images/coupon.png";
import Credit from "../../assets/images/extra.png";
import Candy from "../../assets/images/candy.png";
import Popup from "react-popup";

export default function Reward() {
	const rewards = [
		{
			name: "Coupon",
			image: Coupon,
			points: 20,
			after: "Your voucher will be sent to your email",
		},
		{
			name: "Extra Credit",
			image: Credit,
			points: 100,
			after: "Request for extra credit will be sent to your teacher",
		},
		{
			name: "Candy",
			image: Candy,
			points: 10,
			after: "The candy will be delivered to your address",
		},
	];

	const totalPoints = 40;

	const redeem = (index) => {
		Popup.plugins().redeemPopup(async () => {
			Popup.plugins().rewardPopup(() => {
				console.log("redeemed");
			}, rewards[index]);
		});
		console.log(index);
	};

	return (
		<Container
			className={"flex flex-col items-center justify-center gap-20 p-8"}
		>
			<div className="flex gap-20">
				<img src={Robot} alt="robot" className="h-32" />
				<div className="flex flex-col justify-center gap-6">
					<p className="text-5xl">Redeem Your Rewards</p>
					<p className="text-3xl">Points: {totalPoints}</p>
				</div>
			</div>
			<div className="flex gap-20">
				{rewards.map(({ name, image, points }, index) => (
					<button
						onClick={() => redeem(index)}
						disabled={totalPoints < points}
						key={index}
						className="flex flex-col items-center justify-center rounded-2xl p-5 text-center text-xl hover:bg-gray-100"
					>
						<p
							className={`text-2xl font-bold ${totalPoints < points && "text-gray-300"}`}
						>
							{name}
						</p>
						<img
							src={image}
							alt={name}
							className={`mb-4 h-32 ${totalPoints < points && "opacity-25 grayscale"}`}
						/>
						<p
							className={`text-xl ${totalPoints < points && "text-gray-300"}`}
						>
							{points} pts
						</p>
					</button>
				))}
			</div>
		</Container>
	);
}
