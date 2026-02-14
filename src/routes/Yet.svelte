<svelte:head>
  <title>抽選完了 - KEEPCAST 2026</title>
</svelte:head>

<div class="min-h-full bg-slate-50 p-6 flex flex-col items-center  font-sans text-slate-800">
    
    <div class="w-full max-w-sm bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
        
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%); background-size: 10px 10px;"></div>
        </div>

        <div class="p-8 text-center space-y-6">
            <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <div class="space-y-2">
                <h2 class="text-xl font-bold text-slate-800">抽選受付が完了しました</h2>
                <p class="text-sm text-slate-500 leading-relaxed">
                    アンケートへのご協力、<br />
                    誠にありがとうございました。
                </p>
            </div>

            <div class="py-4">
                <div class="inline-block border-4 border-red-500/30 rounded-xl px-6 py-2 transform -rotate-12">
                    <span class="text-3xl font-black text-red-500/40 tracking-widest uppercase">抽選済</span>
                </div>
            </div>

            <hr class="border-slate-100" />

            <p class="text-[11px] text-slate-400 font-medium leading-tight">
                この画面はスタッフ確認用です。<br>
                引き続きイベントをお楽しみください！
            </p>
        </div>
    </div>
</div>