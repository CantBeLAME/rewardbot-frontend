import React, { useEffect } from "react";
import Popup from "react-popup";
import { Input } from "./Form";
import { Link } from "react-router-dom";

const CanvasTokenPopupContent = ({ onChange }) => {
	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-lg">
				Please enter your Canvas token to continue.
			</h2>
			<Input
				type="text"
				placeholder="Canvas Token"
				name="canvasToken"
				onChange={onChange}
				className="w-full rounded border p-2"
			/>
			<Link
				className="flex justify-end text-sm font-bold text-gray-500 underline"
				to="https://community.canvaslms.com/t5/Canvas-Basics-Guide/How-do-I-manage-API-access-tokens-in-my-user-account/ta-p/615312#:~:text=Mobile%20access%20tokens%20are%20generated,access%20token%20must%20be%20deleted."
			>
				How to generate Canvas Access Token
			</Link>
		</div>
	);
};

const RewardContent = ({ reward: { name, image, after } }) => {
	return (
		<div className="flex flex-col gap-4 items-center">
			<h2 className="text-2xl">
				You have redeemed your reward!
			</h2>
			<div className="text-center items-center flex flex-col">
				<img src={image} alt={name} className="h-64" />
				<p className="text-lg font-bold">{after}</p>
			</div>
		</div>
	);
};

export default function PopUp() {
	useEffect(() => {
		Popup.registerPlugin("canvasTokenPopup", function (success, cancel) {
			let token = "";

			const handleChange = (e) => {
				token = e.target.value;
			};

			this.create({
				title: "Invalid or Missing Canvas Token",
				content: <CanvasTokenPopupContent onChange={handleChange} />,
				buttons: {
					left: [
						{
							text: "Cancel",
							className: "danger",
							action: function () {
								cancel(token);
								Popup.close();
							},
						},
					],
					right: [
						{
							text: "Save",
							className: "success",
							action: function () {
								success(token);
								Popup.close();
							},
						},],
				},
			});
		});

		Popup.registerPlugin("redeemPopup", function (success) {

			this.create({
				title: "Would you like to redeem this reward?",
				buttons: {
					left: [
						{
							text: "Cancel",
							className: "danger",
							action: function () {
								Popup.close();
							},
						},
					],
					right: [
						{
							text: "Redeem",
							className: "success",
							action: function () {
								success();
								Popup.close();
							},
						},
					],
				},
			});
		});

		Popup.registerPlugin("rewardPopup", function (success, reward) {

			this.create({
				title: "CONGRATULATIONS!",
				content: <RewardContent reward={reward} />,
				buttons: {
					right: [
						{
							text: "Close",
							className: "success",
							action: function () {
								success();
								Popup.close();
							},
						},
					],
				},
			});


		});
	}, []);

	return (
		<Popup
			className="mm-popup"
			btnClass="mm-popup__btn"
			closeBtn={false}
			wildClasses={false}
			escToClose={true}
		/>
	);
}
