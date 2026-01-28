<script lang="ts">
	import { localdata, pageNo } from "$lib/store";

	const daytime = $localdata.time;
	const lastnum = String(daytime).slice(-8);

	let lastTap = 0;
	// let isEnd = false;
	const doubleTapThreshold = 300;

	const handleChance = () => {
		// isEnd = true;
		const updatedData = { ...$localdata, yet: true };
		localdata.set(updatedData);
		localStorage.setItem("user", JSON.stringify(updatedData));
		pageNo.set(3);
		window.scroll({ top: 0, behavior: "smooth" });
	};

	function handleTouch(event: PointerEvent) {
		const currentTime = new Date().getTime();
		const tapLength = currentTime - lastTap;

		if (tapLength < doubleTapThreshold && tapLength > 0) {
			handleChance();
		}
		lastTap = currentTime;
	}
</script>

<svelte:head>
	<title>抽選券GET</title>
</svelte:head>
<svelte:window onpointerdown={handleTouch} />

<div
	class="flex flex-col h-5xl items-center text-center bg-red-50 p-3 m-2 rounded-2xl"
>
	<div class="text-lg font-semibold">
		アンケートのご協力<br />
		ありがとうございました。
	</div>

	<div class="text-5xl m-5">
		抽選券<br />
		{lastnum}
	</div>

	<div class="my-5 font-semibold animate-bounce">
		<div class="text-red-500 text-3xl">お楽しみ抽選会</div>
		<div class="text-xl">スタッフに見せてください</div>
	</div>
	<div class="relative w-full max-w-md p-2">
		<img
			src="https://www.thekeepcast.com/wp/wp-content/uploads/2026/01/MAP2026.2_ol-scaled.jpg"
			alt="map"
		/>
		<div
			class="absolute bottom-5 left-2 text-red-500 text-5xl animate-ping"
		>
			★
		</div>
	</div>
</div>
