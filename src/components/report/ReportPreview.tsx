import { TrendingUp, Target, CheckCircle2, Sparkles, Phone, MessageCircle } from "lucide-react";
import { SimplePieChart, SimpleBarChart, SimpleLineChart } from "./SimpleCharts";
import agencyLogo from "@/assets/agency-logo.png";

interface ReportData {
  clientName?: string;
  city?: string;
  period?: string;
  budget?: string;
  impressions?: string;
  reach?: string;
  clicks?: string;
  ctr?: string;
  conversions?: string;
  costPerConversion?: string;
  bookings?: string;
  campaignObjective?: string;
  campaignStatus?: string;
  engagementRate?: string;
  weeklyReachData?: string;
  weeklyClicksData?: string;
  dailyBookingsData?: string;
  recommendations?: string;
}

interface ReportPreviewProps {
  data: ReportData;
}

export const ReportPreview = ({ data }: ReportPreviewProps) => {
  const parseNumber = (str?: string): number => {
    if (!str) return 0;
    return parseFloat(str.replace(/,/g, "").replace(/\s/g, ""));
  };

  const engagementValue = data.engagementRate ? parseNumber(data.engagementRate) : 23;
  const engagementData = [
    { name: "Zaangażowani", value: engagementValue, color: "#3b82f6" },
    { name: "Pozostali", value: 100 - engagementValue, color: "#27272a" },
  ];

  const bookingsNum = parseNumber(data.bookings) || 33;
  const conversionsNum = parseNumber(data.conversions) || 50;
  // Cap at 100% to handle edge cases where bookings > conversions
  const conversionPercentage = conversionsNum > 0 ? Math.min((bookingsNum / conversionsNum) * 100, 100) : 66;
  const conversionData = [
    { name: "Rezerwacje", value: conversionPercentage, color: "#ec4899" },
    { name: "Pozostałe", value: 100 - conversionPercentage, color: "#27272a" },
  ];

  const weeklyData = data.weeklyReachData && data.weeklyClicksData
    ? data.weeklyReachData.split(",").map((reach, i) => ({
        label: `T${i + 1}`,
        value1: parseNumber(reach),
        value2: parseNumber(data.weeklyClicksData!.split(",")[i] || "0"),
      }))
    : [
        { label: "T1", value1: 15000, value2: 650 },
        { label: "T2", value1: 19000, value2: 820 },
        { label: "T3", value1: 25000, value2: 1100 },
        { label: "T4", value1: 26000, value2: 930 },
      ];

  const dailyBookings = data.dailyBookingsData
    ? data.dailyBookingsData.split(",").map((val, i) => ({
        label: ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"][i] || `D${i + 1}`,
        value: parseNumber(val),
      }))
    : [
        { label: "Pn", value: 3 },
        { label: "Wt", value: 5 },
        { label: "Śr", value: 7 },
        { label: "Cz", value: 6 },
        { label: "Pt", value: 8 },
        { label: "Sb", value: 2 },
        { label: "Nd", value: 2 },
      ];

  // Get recommendations - either from data or defaults
  const recommendations = data.recommendations
    ? data.recommendations.split("\n").filter((line) => line.trim()).slice(0, 6)
    : [
        "Zwiększ budżet w piątki i soboty o 40% - dane pokazują że to szczytowe dni rezerwacji w branży beauty",
        "Dodaj kampanię remarketingową 3-7 dni dla osób które nie dokończyły rezerwacji - odzyskasz utracone konwersje",
        "Przetestuj węższą grupę docelową 25-40 lat zamiast szerokiego targetowania - lepsza konwersja i niższy CPC",
        "Włącz targetowanie geograficzne 10km od salonu zamiast całego miasta dla lepszego ROI kampanii",
        "Stwórz karuzelę z efektami przed/po z 3 najpopularniejszych zabiegów - zwiększa zaangażowanie o 40%",
        "Uruchom kampanię lookalike 1% na bazie obecnych klientek - najlepsza jakość ruchu w branży beauty",
      ];

  return (
    <div
      id="report-preview"
      className="bg-zinc-950 text-white w-[794px] h-[1123px] p-5 mx-auto overflow-hidden flex flex-col"
      style={{ backgroundColor: '#09090b' }}
    >
      {/* Header */}
      <header className="flex items-start justify-between mb-4 border-b border-zinc-800 pb-3 flex-shrink-0">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-light">Aurine Agency</p>
              <p className="text-sm font-semibold text-white">Raport kampanii Facebook Ads</p>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              {data.clientName || "Salon Beauty"}
            </h1>
            <p className="text-xs text-zinc-500">{data.city || "Lokalizacja"} • {data.period || "Okres kampanii"}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-flex flex-col items-end gap-0.5 px-4 py-2 rounded-xl bg-gradient-to-br from-pink-600 to-rose-700 shadow-lg shadow-pink-500/25">
            <span className="text-[8px] uppercase tracking-[0.2em] text-pink-100 font-light">Budżet</span>
            <p className="text-xl font-bold text-white">{data.budget ? `${data.budget} PLN` : "—"}</p>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-4 gap-2 mb-3 flex-shrink-0">
        <div className="bg-zinc-950 rounded-xl border border-zinc-800/50 p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-zinc-500 uppercase">Wyświetlenia</span>
            <TrendingUp className="w-3 h-3 text-pink-400" />
          </div>
          <p className="text-lg font-bold text-white">{data.impressions || "—"}</p>
        </div>
        <div className="bg-zinc-950 rounded-xl border border-zinc-800/50 p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-zinc-500 uppercase">Zasięg</span>
            <Target className="w-3 h-3 text-blue-400" />
          </div>
          <p className="text-lg font-bold text-white">{data.reach || "—"}</p>
        </div>
        <div className="bg-zinc-950 rounded-xl border border-zinc-800/50 p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-zinc-500 uppercase">Kliknięcia</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          </div>
          <p className="text-lg font-bold text-white">{data.clicks || "—"}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 rounded-xl border border-pink-500/30 p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-pink-300 uppercase">CTR</span>
            <TrendingUp className="w-3 h-3 text-pink-300" />
          </div>
          <p className="text-lg font-bold text-white">{data.ctr ? `${data.ctr}%` : "—"}</p>
        </div>
      </section>

      {/* Secondary metrics */}
      <section className="grid grid-cols-3 gap-2 mb-3 flex-shrink-0">
        <div className="bg-zinc-950/50 rounded-lg border border-zinc-800/30 px-3 py-2">
          <p className="text-[8px] text-zinc-500 uppercase mb-0.5">Konwersje</p>
          <p className="text-base font-bold text-white">{data.conversions || "—"}</p>
        </div>
        <div className="bg-zinc-950/50 rounded-lg border border-zinc-800/30 px-3 py-2">
          <p className="text-[8px] text-zinc-500 uppercase mb-0.5">Koszt / konwersja</p>
          <p className="text-base font-bold text-pink-400">{data.costPerConversion ? `${data.costPerConversion} PLN` : "—"}</p>
        </div>
        <div className="bg-zinc-950/50 rounded-lg border border-zinc-800/30 px-3 py-2">
          <p className="text-[8px] text-zinc-500 uppercase mb-0.5">Rezerwacje</p>
          <p className="text-base font-bold text-white">{data.bookings || "—"}</p>
        </div>
      </section>

      {/* Campaign Info Row */}
      <section className="grid grid-cols-3 gap-2 mb-3 flex-shrink-0">
        <div className="bg-zinc-900/50 rounded-lg p-2 border border-zinc-800/50">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Target className="w-2.5 h-2.5 text-white" />
            </div>
            <p className="text-[9px] font-semibold text-white">Cel kampanii</p>
          </div>
          <p className="text-[8px] text-zinc-400 leading-tight line-clamp-2">{data.campaignObjective || "Zwiększenie rezerwacji"}</p>
        </div>
        <div className="bg-zinc-900/50 rounded-lg p-2 border border-zinc-800/50">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
            </div>
            <p className="text-[9px] font-semibold text-white">Status</p>
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <span className="text-[8px] text-emerald-300">{data.campaignStatus || "Aktywna"}</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-950/30 to-transparent rounded-lg p-2 border border-purple-700/30">
          <p className="text-[8px] uppercase text-purple-300 mb-1">Wskaźniki</p>
          <div className="space-y-0.5 text-[8px]">
            <div className="flex justify-between">
              <span className="text-zinc-400">CPC</span>
              <span className="font-bold text-purple-300">
                {data.clicks && data.budget && parseNumber(data.clicks) > 0 ? `${(parseNumber(data.budget) / parseNumber(data.clicks)).toFixed(2)} PLN` : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Conv.</span>
              <span className="font-bold text-pink-300">
                {data.conversions && data.clicks && parseNumber(data.clicks) > 0 ? `${((parseNumber(data.conversions) / parseNumber(data.clicks)) * 100).toFixed(1)}%` : "—"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Charts 2x2 */}
      <section className="grid grid-cols-2 gap-2 mb-3 flex-shrink-0">
        <div className="bg-gradient-to-br from-pink-950/20 to-zinc-950/50 rounded-lg border border-pink-800/20 p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-5 h-5 rounded flex items-center justify-center">
              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
            </div>
            <div>
              <h4 className="text-[9px] font-semibold text-white">Efektywność rezerwacji</h4>
              <p className="text-[7px] text-pink-300">{bookingsNum} z {conversionsNum} konwersji</p>
            </div>
          </div>
          <div className="flex justify-center">
            <SimplePieChart data={conversionData} size={85} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-950/20 to-zinc-950/50 rounded-lg border border-blue-800/20 p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-5 h-5 rounded flex items-center justify-center">
              <Target className="w-2.5 h-2.5 text-white" />
            </div>
            <div>
              <h4 className="text-[9px] font-semibold text-white">Zaangażowanie</h4>
              <p className="text-[7px] text-blue-300">{engagementValue}% zaangażowanych</p>
            </div>
          </div>
          <div className="flex justify-center">
            <SimplePieChart data={engagementData} size={85} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-950/20 to-zinc-950/50 rounded-lg border border-purple-800/20 p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-5 h-5 rounded flex items-center justify-center">
              <TrendingUp className="w-2.5 h-2.5 text-white" />
            </div>
            <div>
              <h4 className="text-[9px] font-semibold text-white">Trend tygodniowy</h4>
              <p className="text-[7px] text-purple-300">Zasięg i kliknięcia</p>
            </div>
          </div>
          <div className="flex justify-center">
            <SimpleLineChart data={weeklyData} width={200} height={70} color1="#ec4899" color2="#3b82f6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-950/20 to-zinc-950/50 rounded-lg border border-rose-800/20 p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 w-5 h-5 rounded flex items-center justify-center">
              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
            </div>
            <div>
              <h4 className="text-[9px] font-semibold text-white">Rezerwacje dzienne</h4>
              <p className="text-[7px] text-rose-300">Rozkład tygodniowy</p>
            </div>
          </div>
          <div className="flex justify-center">
            <SimpleBarChart data={dailyBookings} width={200} height={70} color="#ec4899" />
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS - Main section */}
      <section className="bg-gradient-to-br from-emerald-950/40 via-zinc-950/70 to-zinc-950/60 rounded-xl border border-emerald-800/40 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Rekomendacje marketingowe</h4>
            <p className="text-[9px] text-emerald-300">Konkretne kolejne kroki oparte na danych</p>
          </div>
        </div>
        <div className="space-y-2">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex gap-2">
              <div className="w-5 h-5 rounded bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-bold text-emerald-400">{idx + 1}</span>
              </div>
              <p className="text-[10px] text-zinc-200 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[8px] text-zinc-600 flex-shrink-0 mt-3">
        <p>© 2025 Aurine Agency • aurine.pl</p>
        <div className="flex items-center gap-1.5">
          <MessageCircle className="w-3 h-3 text-pink-400" />
          <Phone className="w-3 h-3 text-pink-400" />
          <span>+48 731 856 524</span>
        </div>
      </footer>
    </div>
  );
};
