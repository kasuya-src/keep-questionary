<!-- <script lang="ts">
    import { saveFormData } from "$lib/index";
    import { localdata, pageNo } from "$lib/store";
    import { QuestionnaireSchema } from "$lib/schema";
    import type { FormErrors } from "$lib/schema";
    import type { yetForm } from "$lib/type";

    let formdata = $state<yetForm>({
        age: "",
        gender: "",
        area: "",
        meate: [],
        nowang: [],
        futureang: [],
        hosi: null,
        history: "",
        look :"",
    });

    let formErrors = $state<FormErrors>({});

    const selectAge = ["10代未満", "10代", "20代", "30代", "40代", "50代", "60代以上"];
    const selectGender = ["男性", "女性", "どちらでもない"];
    const selectHosi = [1, 2, 3, 4, 5];
    const selectArea = ["北海道", "東北", "北関東", "南関東", "愛知県",  "岐阜県", "三重県", "静岡県","北陸", "近畿", "中国", "四国", "九州・沖縄", "海外"];
    const selectMeate = ["限定品", "アウトレット", "新製品", "既存品", "メーカーさんと交流", "トークショー", "プロアングラー", "キャスティングエリアのイベント", "抽選会", "お子様向けイベント"];
    const selectHistory = ["1年未満", "1年〜3年", "3年〜5年", "5年〜10年","10年以上"];
    const selectLook = ["インスタ（公式アカウント）","X（公式アカウント）","facebook（公式アカウント）","他人、メーカー側SNS発信",'紙面など紙媒体','その他']

    const selectAng = ["バス(オカッパリ）", "バス(ボート）", "エリアトラウト", "ネイティブトラウト", "アユイング", "オフショアジギング", 
    "オフショアキャスティング（マグロ/ヒラマサ）", "ボートキャスティング（シーバス/サワラ/マゴチ/チニングなど）", "タイラバ",
"イカメタル", "ティップラン", "バチコン", "ショアエギング", "ショアサーフ", "ショアシーバス",
 "チニング", "ショア アジング", "ショア メバリング", "ショアジギング（ヘビー）", "ショアジギング（ライト・スーパーライト）", "ロックショア","ロックフィッシュ"];

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const parsed = QuestionnaireSchema.safeParse(formdata);
        if (!parsed.success) {
            formErrors = parsed.error.flatten().fieldErrors;
            scrollToFirstError(formErrors);
            return;
        }
        const createdAt = new Date().getTime();
        const updatedData = { ...$localdata, isSubmit: true, time: createdAt };
        localdata.set(updatedData);
        localStorage.setItem("user", JSON.stringify(updatedData));
        const result = await saveFormData(parsed.data);
        if (result.success) {
            pageNo.set(2);
        } else {
            alert("データの保存に失敗しました");
        }
    }

    function clearError(key: keyof FormErrors) {
        if (formErrors[key]) {
            formErrors = { ...formErrors, [key]: undefined };
        }
    }

    function scrollToFirstError(errors: Record<string, string[]>) {
        const firstKey = Object.keys(errors)[0] as keyof FormErrors;
        if (!firstKey) return;
        const el = document.querySelector(`[data-field="${firstKey}"]`) as HTMLElement | null;
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
</script>

<form onsubmit={handleSubmit} class="bg-slate-50 min-h-screen p-3 font-sans text-slate-800">
    <div class="max-w-md mx-auto space-y-4">
        <div class="text-center py-2">
            <h1 class="text-xl font-black text-blue-600 tracking-tighter italic">KEEPCAST 2026</h1>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Questionnaire</p>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 space-y-6">
            
            <div class="grid grid-cols-2 gap-3">
                <div data-field="age" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">年代</span>
                    <select bind:value={formdata.age} onchange={() => clearError("age")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                        <option value="" disabled selected>選択</option>
                        {#each selectAge as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                    {#if formErrors.age}<p class="text-red-500 text-[9px] font-bold mt-1 ml-1 leading-none">{formErrors.age[0]}</p>{/if}
                </div>
                <div data-field="gender" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">性別</span>
                    <select bind:value={formdata.gender} onchange={() => clearError("gender")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                        <option value="" disabled selected>選択</option>
                        {#each selectGender as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                    {#if formErrors.gender}<p class="text-red-500 text-[9px] font-bold mt-1 ml-1 leading-none">{formErrors.gender[0]}</p>{/if}
                </div>
                <div data-field="area" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">地域</span>
                    <select bind:value={formdata.area} onchange={() => clearError("area")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                        <option value="" disabled selected>選択</option>
                        {#each selectArea as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                    {#if formErrors.area}<p class="text-red-500 text-[9px] font-bold mt-1 ml-1 leading-none">{formErrors.area[0]}</p>{/if}
                </div>
                <div data-field="history" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">釣歴</span>
                    <select bind:value={formdata.history} onchange={() => clearError("history")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                        <option value="" disabled selected>選択</option>
                        {#each selectHistory as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                    {#if formErrors.history}<p class="text-red-500 text-[9px] font-bold mt-1 ml-1 leading-none">{formErrors.history[0]}</p>{/if}
                </div>
            </div>

            <div data-field="meate" class="space-y-3">
                <div class="flex items-center gap-2 text-[11px] font-bold text-slate-400 ml-1">
                    <span>お目当て</span><span class="text-[9px] text-blue-500 border border-blue-200 px-1.5 rounded-full uppercase">Multiple</span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                    {#each selectMeate as elm}
                        <label class="flex items-center justify-center px-3 py-2 rounded-full border text-center transition-all cursor-pointer {formdata.meate.includes(elm) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500'}">
                            <input type="checkbox" value={elm} bind:group={formdata.meate} onchange={() => clearError("meate")} class="sr-only" />
                            <span class="text-[10px] font-bold whitespace-nowrap">{elm}</span>
                        </label>
                    {/each}
                </div>
                {#if formErrors.meate}<p class="text-red-500 text-[9px] font-bold mt-1 ml-1 italic text-right">{formErrors.meate[0]}</p>{/if}
            </div>

            {#each [{label: '今やっている釣り', field: 'nowang', data: 'nowang'}, {label: 'やってみたい釣り', field: 'futureang', data: 'futureang'}] as section}
                <div data-field={section.field} class="space-y-3">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">{section.label}</span>
                    <div class="flex flex-wrap gap-1.5">
                        {#each selectAng as elm}
                            <label class="flex items-center justify-center px-3 py-2 rounded-full border text-center transition-all cursor-pointer {formdata[section.data as 'nowang' | 'futureang'].includes(elm) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500'}">
                                <input type="checkbox" value={elm} bind:group={formdata[section.data as 'nowang' | 'futureang']} onchange={() => clearError(section.field as keyof FormErrors)} class="sr-only" />
                                <span class="text-[10px] font-bold whitespace-nowrap">{elm}</span>
                            </label>
                        {/each}
                    </div>
                </div>
            {/each}

            <div class="bg-blue-50/50 rounded-3xl p-4 text-center space-y-2" data-field="hosi">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-tighter">Satisfaction</span>
                <div class="flex justify-center gap-1">
                    {#each selectHosi as h}
                        <button type="button" class="text-4xl transition-all active:scale-150 {(formdata.hosi ?? 0) >= h ? 'text-yellow-400' : 'text-slate-200'}" onclick={() => { formdata.hosi = h; clearError("hosi"); }}>★</button>
                    {/each}
                </div>
                {#if formErrors.hosi}<p class="text-red-500 text-[9px] font-bold italic">{formErrors.hosi[0]}</p>{/if}
            </div>

            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 text-sm uppercase tracking-widest" type="submit">
                Submit Response
            </button>
        </div>
    </div>
</form> -->

<!-- <script lang="ts">
    import { saveFormData } from "$lib/index";
    import { localdata, pageNo } from "$lib/store";
    import { QuestionnaireSchema } from "$lib/schema";
    import type { FormErrors } from "$lib/schema";
    import type { yetForm } from "$lib/type";

    let formdata = $state<yetForm>({
        age: "",
        gender: "",
        area: "",
        meate: [],
        nowang: [],
        futureang: [],
        hosi: null,
        history: "",
        look :"",
        good_booth: "",
        expectation: ""
    });

    let formErrors = $state<FormErrors>({});
    let otherLook = $state("");
    let isOtherSelected = $state(false);

    const selectAge = ["10代未満", "10代", "20代", "30代", "40代", "50代", "60代以上"];
    const selectGender = ["男性", "女性", "どちらでもない"];
    const selectHosi = [1, 2, 3, 4, 5];
    const selectArea = ["北海道", "東北", "北関東", "南関東", "愛知県",  "岐阜県", "三重県", "静岡県","北陸", "近畿", "中国", "四国", "九州・沖縄", "海外"];
    const selectMeate = ["限定品", "アウトレット", "新製品", "既存品", "メーカーさんと交流", "トークショー", "プロアングラー", "キャスティングエリアのイベント", "抽選会", "お子様向けイベント"];
    const selectHistory = ["1年未満", "1年〜3年", "3年〜5年", "5年〜10年","10年以上"];
    const selectLook = ["インスタ（公式アカウント）","X（公式アカウント）","facebook（公式アカウント）","他人、メーカー側SNS発信",'紙面など紙媒体','その他'];

    const selectAng = ["バス(オカッパリ）", "バス(ボート）", "エリアトラウト", "ネイティブトラウト", "アユイング", "オフショアジギング", 
    "オフショアキャスティング（マグロ/ヒラマサ）", "ボートキャスティング（シーバス/サワラ/マゴチ/チニングなど）", "タイラバ",
    "イカメタル", "ティップラン", "バチコン", "ショアエギング", "ショアサーフ", "ショアシーバス",
    "チニング", "ショア アジング", "ショア メバリング", "ショアジギング（ヘビー）", "ショアジギング（ライト・スーパーライト）", "ロックショア","ロックフィッシュ"];

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const parsed = QuestionnaireSchema.safeParse(formdata);
        if (!parsed.success) {
            // 送信失敗時（バリデーションエラー時）のみスクロールを実行
            formErrors = parsed.error.flatten().fieldErrors;
            scrollToFirstError(formErrors);
            return;
        }
        const createdAt = new Date().getTime();
        const updatedData = { ...$localdata, isSubmit: true, time: createdAt };
        localdata.set(updatedData);
        localStorage.setItem("user", JSON.stringify(updatedData));
        const result = await saveFormData(parsed.data);
        if (result.success) {
            pageNo.set(2);
        } else {
            alert("データの保存に失敗しました");
        }
    }

    // 安全なエラー削除
    function clearError(key: string) {
        if (formErrors && (formErrors as any)[key]) {
            // 直接 undefined を代入するのではなく、新しいオブジェクトとして認識させるが
            // スクロール関数をここでは呼ばないことが重要
            (formErrors as any)[key] = undefined;
        }
    }

    function scrollToFirstError(errors: Record<string, string[]>) {
        // 送信ボタンを押した時以外にここが動かないよう、
        // 念のため errors が空でないことを厳密にチェック
        const keys = Object.keys(errors).filter(k => errors[k] !== undefined);
        if (keys.length === 0) return;

        const firstKey = keys[0];
        const el = document.querySelector(`[data-field="${firstKey}"]`) as HTMLElement | null;
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    function handleLookChange(opt: string) {
        if (opt === 'その他') {
            isOtherSelected = true;
            formdata.look = otherLook;
        } else {
            isOtherSelected = false;
            formdata.look = opt;
        }
        clearError("look");
    }
</script>

<form onsubmit={handleSubmit} class="bg-slate-50 h-full p-3 font-sans text-slate-800 pb-20">
    <div class="max-w-md mx-auto space-y-4">
        <div class="text-center py-2">
            <h1 class="text-xl font-black text-blue-600 tracking-tighter italic">KEEPCAST 2026</h1>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Questionnaire</p>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 space-y-8">
            
            <div class="grid grid-cols-2 gap-3">
                <div data-field="age" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">年代</span>
                    <select bind:value={formdata.age} onchange={() => clearError("age")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold">
                        <option value="">選択</option>
                        {#each selectAge as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                </div>
                <div data-field="gender" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">性別</span>
                    <select bind:value={formdata.gender} onchange={() => clearError("gender")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold">
                        <option value="">選択</option>
                        {#each selectGender as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                </div>
                <div data-field="area" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">地域</span>
                    <select bind:value={formdata.area} onchange={() => clearError("area")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold">
                        <option value="">選択</option>
                        {#each selectArea as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                </div>
                <div data-field="history" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">釣歴</span>
                    <select bind:value={formdata.history} onchange={() => clearError("history")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold">
                        <option value="">選択</option>
                        {#each selectHistory as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                </div>
            </div>

            <div data-field="meate" class="space-y-3 pt-4 border-t border-slate-100">
                <span class="text-[11px] font-bold text-slate-400 ml-1">お目当て (複数選択)</span>
                <div class="flex flex-col gap-2">
                    {#each selectMeate as elm}
                        <label class="flex items-center p-4 rounded-2xl border transition-all {formdata.meate.includes(elm) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500'}">
                            <input type="checkbox" value={elm} bind:group={formdata.meate} onchange={() => clearError("meate")} class="sr-only" />
                            <span class="text-[12px] font-bold">{elm}</span>
                        </label>
                    {/each}
                </div>
            </div>

            <div data-field="nowang" class="space-y-3 pt-4 border-t border-slate-100">
                <span class="text-[11px] font-bold text-slate-400 ml-1">今やっている釣り</span>
                <div class="flex flex-col gap-2">
                    {#each selectAng as elm}
                        <label class="flex items-center p-4 rounded-2xl border transition-all {formdata.nowang.includes(elm) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500'}">
                            <input type="checkbox" value={elm} bind:group={formdata.nowang} onchange={() => clearError("nowang")} class="sr-only" />
                            <span class="text-[12px] font-bold">{elm}</span>
                        </label>
                    {/each}
                </div>
            </div>

            <div data-field="futureang" class="space-y-3 pt-4 border-t border-slate-100">
                <span class="text-[11px] font-bold text-slate-400 ml-1">やってみたい釣り</span>
                <div class="flex flex-col gap-2">
                    {#each selectAng as elm}
                        <label class="flex items-center p-4 rounded-2xl border transition-all {formdata.futureang.includes(elm) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500'}">
                            <input type="checkbox" value={elm} bind:group={formdata.futureang} onchange={() => clearError("futureang")} class="sr-only" />
                            <span class="text-[12px] font-bold">{elm}</span>
                        </label>
                    {/each}
                </div>
            </div>

            <div data-field="look" class="space-y-3 pt-4 border-t border-slate-100">
                <span class="text-[11px] font-bold text-slate-400 ml-1">今回のイベントをどこで知りましたか？</span>
                <div class="flex flex-col gap-2">
                    {#each selectLook as opt}
                        <label class="flex items-center gap-3 p-4 rounded-2xl border transition-all 
                            { (opt === 'その他' && isOtherSelected) || (opt !== 'その他' && formdata.look === opt && !isOtherSelected) 
                            ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}">
                            <input 
                                type="radio" 
                                name="look_radio" 
                                checked={(opt === 'その他' && isOtherSelected) || (opt !== 'その他' && formdata.look === opt && !isOtherSelected)}
                                onchange={() => handleLookChange(opt)} 
                                class="w-4 h-4 text-blue-600" 
                            />
                            <span class="text-xs font-bold text-slate-600">{opt}</span>
                        </label>
                    {/each}
                    {#if isOtherSelected}
                        <div class="px-1 pt-1">
                            <input 
                                type="text" 
                                bind:value={otherLook} 
                                oninput={() => { formdata.look = otherLook; }}
                                placeholder="具体的にお教えください" 
                                class="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    {/if}
                </div>
            </div>

            <div class="space-y-4 pt-4 border-t border-slate-100">
                <div data-field="good_booth" class="space-y-2">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">良かったメーカーブース</span>
                    <textarea bind:value={formdata.good_booth} placeholder="ブース名や理由など" class="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold min-h-[100px] resize-none"></textarea>
                </div>

                <div data-field="expectation" class="space-y-2">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">メーカーに期待すること</span>
                    <textarea bind:value={formdata.expectation} placeholder="今後の製品やイベントへの要望など" class="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold min-h-[100px] resize-none"></textarea>
                </div>
            </div>

            <div class="bg-blue-50/50 rounded-3xl p-6 text-center space-y-3" data-field="hosi">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Satisfaction</span>
                <div class="flex justify-center gap-2">
                    {#each selectHosi as h}
                        <button type="button" class="text-4xl transition-all {(formdata.hosi ?? 0) >= h ? 'text-yellow-400' : 'text-slate-200'}" onclick={() => { formdata.hosi = h; clearError("hosi"); }}>★</button>
                    {/each}
                </div>
            </div>

            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-95 text-sm uppercase tracking-widest" type="submit">
                Submit Response
            </button>
        </div>
    </div>
</form> -->



<script lang="ts">
    import { saveFormData } from "$lib/index";
    import { localdata, pageNo } from "$lib/store";
    import { QuestionnaireSchema } from "$lib/schema";
    import type { FormErrors } from "$lib/schema";
    import type { yetForm } from "$lib/type";

    let formdata = $state<yetForm>({
        age: "", gender: "", area: "", meate: [], nowang: [], futureang: [],
        hosi: null, history: "", look :"", good_booth: "", expectation: ""
    });

    let formErrors = $state<FormErrors>({});
    let otherLook = $state("");
    let isOtherSelected = $state(false);
    let openSectionName = $state<string | null>(null);
    let isSubmitting = $state(false);


    const selectAge = ["10代未満", "10代", "20代", "30代", "40代", "50代", "60代以上"];
    const selectGender = ["男性", "女性", "どちらでもない"];
    const selectHosi = [1, 2, 3, 4, 5];
    const selectArea = ["北海道", "東北", "北関東", "南関東", "愛知県",  "岐阜県", "三重県", "静岡県","北陸", "近畿", "中国", "四国", "九州・沖縄", "海外"];
    const selectMeate = ["限定品", "アウトレット", "新製品", "既存品", "メーカーさんと交流", "トークショー", "プロアングラー", "キャスティングエリア", "抽選会", "お子様向けイベント"];
    const selectHistory = ["1年未満", "1年〜3年", "3年〜5年", "5年〜10年","10年以上"];
    const selectLook = ["インスタ（公式アカウント）","X（公式アカウント）","facebook（公式アカウント）","他人、メーカー側SNS発信",'紙面など紙媒体','その他'];

    const selectAng = [
        "バス(オカッパリ）", "バス(ボート）", "エリアトラウト", "ネイティブトラウト", "アユイング", "オフショアジギング", 
        "オフショアキャスティング（マグロ/ヒラマサ）", "ボートキャスティング（シーバス/サワラ/マゴチ/チニングなど）", 
        "タイラバ", "イカメタル", "ティップラン", "バチコン", "ショアエギング", "ショアサーフ", "ショアシーバス",
        "チニング", "ショア アジング", "ショア メバリング", "ショアジギング（ヘビー）", "ショアジギング（ライト・スーパーライト）", "ロックショア", "ロックフィッシュ"
    ];

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        if (isSubmitting) return;
        const parsed = QuestionnaireSchema.safeParse(formdata);
        if (!parsed.success) {
            formErrors = parsed.error.flatten().fieldErrors;
            if (formErrors.meate) openSectionName = 'meate';
            else if (formErrors.nowang) openSectionName = 'nowang';
            else if (formErrors.futureang) openSectionName = 'futureang';
            else if (formErrors.look) openSectionName = 'look';
            scrollToField(Object.keys(formErrors)[0]);
            return;
        }
        isSubmitting = true;
        // ★元の保存ロジックを復元
        try {
            const createdAt = new Date().getTime();
            const updatedData = { ...$localdata, isSubmit: true, time: createdAt };
            localdata.set(updatedData);
            localStorage.setItem("user", JSON.stringify(updatedData));

            const result = await saveFormData(parsed.data);
            if (result.success) {
                pageNo.set(2);
            } else {
                alert("データの保存に失敗しました");
                isSubmitting = false; // 失敗時は再度押せるようにする
            }
        } catch (e) {
            console.error(e);
            alert("エラーが発生しました");
            isSubmitting = false; // エラー時も再度押せるようにする
        }
    }

    function clearError(key: string) {
        if (formErrors && (formErrors as any)[key]) {
            const nextErrors = { ...formErrors };
            delete (nextErrors as any)[key];
            formErrors = nextErrors;
        }
    }

    function scrollToField(fieldName: string) {
        setTimeout(() => {
            const el = document.querySelector(`[data-field="${fieldName}"]`) as HTMLElement | null;
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    }

    function handleLookChange(opt: string) {
        if (opt === 'その他') {
            isOtherSelected = true;
            formdata.look = otherLook;
        } else {
            isOtherSelected = false;
            formdata.look = opt;
            setTimeout(() => { 
                openSectionName = null; 
                scrollToField("good_booth"); 
            }, 300);
        }
        clearError("look");
    }

    function toggleSection(name: string) {
        if (openSectionName === name) openSectionName = null;
        else { openSectionName = name; scrollToField(name); }
    }
</script>

<form onsubmit={handleSubmit} class="bg-slate-50 min-h-screen p-3 font-sans text-slate-800 pb-20">
    <div class="max-w-md mx-auto space-y-4">
        
        <div class="bg-linear-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 text-white shadow-md text-center">
             <h2 class="text-lg font-black leading-tight">アンケート回答で<br><span class="text-2xl">抽選番号ゲット！</span></h2>
        </div>

        <div class="text-center py-1">
            <h1 class="text-xl font-black text-blue-600 italic tracking-tighter">KEEPCAST 2026</h1>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 space-y-6">
            
            <div class="grid grid-cols-2 gap-3">
                {#each [{l:'年代', f:'age', s:selectAge}, {l:'性別', f:'gender', s:selectGender}, {l:'地域', f:'area', s:selectArea}, {l:'釣歴', f:'history', s:selectHistory}] as item}
                <div data-field={item.f} class="space-y-1">
                    <span class="text-[11px] font-bold {formErrors[item.f as keyof FormErrors] ? 'text-red-500' : 'text-slate-400'} ml-1">{item.l}</span>
                    <select bind:value={(formdata as any)[item.f]} onchange={() => clearError(item.f)} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold appearance-none">
                        <option value="">選択</option>
                        {#each item.s as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                </div>
                {/each}
            </div>

            <div data-field="meate" class="border-t border-slate-100 pt-4">
                <button type="button" onclick={() => toggleSection('meate')} class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-2">
                        <span class="text-[11px] font-bold {formErrors.meate ? 'text-red-500 animate-pulse' : 'text-blue-500'}">お目当て（必須）</span>
                        {#if formdata.meate.length > 0}
                            <span class="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{formdata.meate.length}</span>
                        {/if}
                    </div>
                    <span class="text-slate-300 transition-transform {openSectionName === 'meate' ? 'rotate-180 text-blue-500' : ''}">▼</span>
                </button>
                {#if openSectionName === 'meate'}
                    <div class="grid grid-cols-2 gap-2 mt-3 bg-blue-50 p-1">
                        {#each selectMeate as elm}
                            <label class="flex items-center justify-center p-3 rounded-2xl border text-center transition-all {formdata.meate.includes(elm) ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500'}">
                                <input type="checkbox" value={elm} bind:group={formdata.meate} onchange={() => clearError("meate")} class="sr-only" />
                                <span class="font-bold leading-tight whitespace-nowrap overflow-hidden {elm.length > 8 ? 'text-[9px]' : 'text-[11px]'}">{elm}</span>
                            </label>
                        {/each}
                    </div>
                {/if}
            </div>

            <div data-field="nowang" class="border-t border-slate-100 pt-4">
                <button type="button" onclick={() => toggleSection('nowang')} class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-2 text-left">
                        <span class="text-[11px] font-bold {formErrors.nowang ? 'text-red-500 animate-pulse' : 'text-emerald-500'}">今やっている釣り（必須）</span>
                        {#if formdata.nowang.length > 0}
                            <span class="bg-emerald-100 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{formdata.nowang.length}</span>
                        {/if}
                    </div>
                    <span class="text-slate-300 transition-transform {openSectionName === 'nowang' ? 'rotate-180 text-emerald-500' : ''}">▼</span>
                </button>
                {#if openSectionName === 'nowang'}
                    <div class="grid grid-cols-2 gap-2 mt-3 bg-green-50 p-1">
                        {#each selectAng as elm}
                            <label class="flex items-center justify-center p-3 rounded-2xl border text-center transition-all {elm.length > 10 ? 'col-span-2' : ''} {formdata.nowang.includes(elm) ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500'}">
                                <input type="checkbox" value={elm} bind:group={formdata.nowang} onchange={() => clearError("nowang")} class="sr-only" />
                                <span class="font-bold leading-tight whitespace-nowrap overflow-hidden {elm.length > 15 ? 'text-[9px]' : 'text-[11px]'}">{elm}</span>
                            </label>
                        {/each}
                    </div>
                {/if}
            </div>

            <div data-field="futureang" class="border-t border-slate-100 pt-4">
                <button type="button" onclick={() => toggleSection('futureang')} class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-2 text-left">
                        <span class="text-[11px] font-bold {formErrors.futureang ? 'text-red-500 animate-pulse' : 'text-orange-500'}">やってみたい釣り（必須）</span>
                        {#if formdata.futureang.length > 0}
                            <span class="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{formdata.futureang.length}</span>
                        {/if}
                    </div>
                    <span class="text-slate-300 transition-transform {openSectionName === 'futureang' ? 'rotate-180 text-orange-500' : ''}">▼</span>
                </button>
                {#if openSectionName === 'futureang'}
                    <div class="grid grid-cols-2 gap-2 mt-3 bg-orange-50 p-1">
                        {#each selectAng as elm}
                            <label class="flex items-center justify-center p-3 rounded-2xl border text-center transition-all {elm.length > 10 ? 'col-span-2' : ''} {formdata.futureang.includes(elm) ? 'bg-orange-600 border-orange-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500'}">
                                <input type="checkbox" value={elm} bind:group={formdata.futureang} onchange={() => clearError("futureang")} class="sr-only" />
                                <span class="font-bold leading-tight whitespace-nowrap overflow-hidden {elm.length > 15 ? 'text-[9px]' : 'text-[11px]'}">{elm}</span>
                            </label>
                        {/each}
                    </div>
                {/if}
            </div>

            <div data-field="look" class="border-t border-slate-100 pt-4">
                <button type="button" onclick={() => toggleSection('look')} class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-2">
                        <span class="text-[11px] font-bold {formErrors.look ? 'text-red-500 animate-pulse' : 'text-purple-500'}">イベントを何で知りましたか？（必須）</span>
                        {#if formdata.look}
                            <span class="text-purple-600 text-[10px] font-bold truncate max-w-[120px]">: {formdata.look}</span>
                        {/if}
                    </div>
                    <span class="text-slate-300 transition-transform {openSectionName === 'look' ? 'rotate-180 text-purple-500' : ''}">▼</span>
                </button>
                {#if openSectionName === 'look'}
                    <div class="flex flex-col gap-2 mt-3 bg-purple-50 p-1" >
                        {#each selectLook as opt}
                            <label class="flex items-center justify-center p-3 rounded-2xl border text-center transition-all { (opt === 'その他' && isOtherSelected) || (opt !== 'その他' && formdata.look === opt && !isOtherSelected) ? 'bg-purple-600 border-purple-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500'}">
                                <input type="radio" name="look_radio" checked={(opt === 'その他' && isOtherSelected) || (opt !== 'その他' && formdata.look === opt && !isOtherSelected)} onchange={() => handleLookChange(opt)} class="sr-only" />
                                <span class="font-bold whitespace-nowrap overflow-hidden {opt.length > 12 ? 'text-[9px]' : 'text-[11px]'}">{opt}</span>
                            </label>
                        {/each}
                        {#if isOtherSelected}
                            <input type="text" bind:value={otherLook} oninput={() => { formdata.look = otherLook; }} placeholder="内容を入力" class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-bold mt-1 outline-none" />
                        {/if}
                    </div>
                {/if}
            </div>

            <div class="space-y-4 pt-4 border-t border-slate-100">
                {#each [{f:'good_booth', l:'良かったメーカーブース'}, {f:'expectation', l:'メーカーに期待すること'}] as text}
                <div data-field={text.f} class="space-y-2">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">{text.l}</span>
                    <textarea bind:value={(formdata as any)[text.f]} placeholder="（任意）" class="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold min-h-[80px] resize-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                {/each}
            </div>

            <!-- <div class="bg-blue-50/50 rounded-3xl p-6 text-center space-y-3" data-field="hosi">
                <span class="text-xs font-bold {formErrors.hosi ? 'text-red-500' : 'text-slate-500'} tracking-widest">Satisfaction</span>
                <div class="flex justify-center gap-2">
                    {#each selectHosi as h}
                        <button type="button" class="text-4xl transition-all {(formdata.hosi ?? 0) >= h ? 'text-yellow-400' : 'text-slate-200'}" onclick={() => { formdata.hosi = h; clearError("hosi"); }}>★</button>
                    {/each}
                </div>
            </div> -->
                <button 
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-100 active:scale-95 text-base tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100" 
                    type="submit"
                    disabled={isSubmitting}
                >
                    {#if isSubmitting}
                        送信中...
                    {:else}
                        抽選番号をゲット!
                    {/if}
                </button>
       
        </div>
    </div>
</form>