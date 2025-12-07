import agencyLogo from "@/assets/agency-logo.png";

interface ServiceItem {
  id: string;
  name: string;
}

interface ContractData {
  clientName: string;
  clientAddress: string;
  clientNip: string;
  clientOwnerName: string;
  clientEmail: string;
  clientPhone: string;
  signDate: string;
  signCity: string;
  contractValue: string;
  paymentType: "full" | "split";
  advanceAmount: string;
  agencyName: string;
  agencyOwnerName: string;
  agencyEmail: string;
  agencyPhone: string;
  agencyAddress: string;
  agencyNip: string;
  services: ServiceItem[];
}

interface ContractPreviewProps {
  data: ContractData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "........................";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
};

const formatAmount = (amount: string | number) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num) || num === 0) return "............";
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";
};

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  const totalValue = parseFloat(data.contractValue) || 0;
  const advanceValue = data.paymentType === "split" ? (parseFloat(data.advanceAmount) || 0) : 0;
  const remainingValue = data.paymentType === "split" ? Math.max(0, totalValue - advanceValue) : 0;

  const defaultServices = [
    "Tworzenie i prowadzenie kampanii Facebook Ads",
    "Przygotowanie materiałów reklamowych",
    "Optymalizacja i monitorowanie wyników",
    "Raporty miesięczne",
    "Doradztwo marketingowe"
  ];

  const servicesList = data.services?.length > 0 
    ? data.services.map(s => s.name)
    : defaultServices;

  return (
    <div
      id="contract-preview"
      style={{
        width: "794px",
        minHeight: "1123px",
        background: "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
        color: "#fafafa",
        fontFamily: "'Inter', -apple-system, sans-serif",
        fontSize: "11px",
        lineHeight: "1.5",
        padding: "40px 48px",
        boxSizing: "border-box",
      }}
    >
      {/* ===== HEADER ===== */}
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start",
        marginBottom: "28px",
        paddingBottom: "20px",
        borderBottom: "2px solid #ec4899"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img src={agencyLogo} alt="Aurine" style={{ width: "44px", height: "44px", objectFit: "contain" }} />
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#71717a", textTransform: "uppercase" }}>Agencja Marketingowa</div>
            <div style={{ fontSize: "22px", fontWeight: "700", background: "linear-gradient(90deg, #ec4899, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Aurine</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#fafafa", letterSpacing: "0.02em" }}>UMOWA O ŚWIADCZENIE</div>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#fafafa", letterSpacing: "0.02em" }}>USŁUG MARKETINGOWYCH</div>
          <div style={{ fontSize: "10px", color: "#71717a", marginTop: "6px" }}>
            {data.signCity || "............"}, {formatDate(data.signDate)}
          </div>
        </div>
      </header>

      {/* ===== STRONY UMOWY ===== */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        {/* Zleceniodawca */}
        <div style={{ 
          background: "linear-gradient(145deg, rgba(59,130,246,0.08), rgba(59,130,246,0.02))",
          border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: "10px",
          padding: "16px"
        }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#60a5fa", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>
            Zleceniodawca
          </div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#fafafa", marginBottom: "4px" }}>
            {data.clientName || "................................"}
          </div>
          <div style={{ fontSize: "11px", color: "#a1a1aa", marginBottom: "6px" }}>
            {data.clientOwnerName || "Imię i Nazwisko"}
          </div>
          <div style={{ fontSize: "10px", color: "#71717a", lineHeight: "1.6" }}>
            {data.clientAddress || "adres"}<br/>
            {data.clientNip && <>NIP: {data.clientNip}<br/></>}
            {data.clientEmail && <>{data.clientEmail}<br/></>}
            {data.clientPhone && <>tel. {data.clientPhone}</>}
          </div>
        </div>

        {/* Wykonawca */}
        <div style={{ 
          background: "linear-gradient(145deg, rgba(236,72,153,0.08), rgba(236,72,153,0.02))",
          border: "1px solid rgba(236,72,153,0.2)",
          borderRadius: "10px",
          padding: "16px"
        }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#ec4899", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>
            Wykonawca
          </div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#fafafa", marginBottom: "4px" }}>
            {data.agencyName || "Agencja Marketingowa Aurine"}
          </div>
          <div style={{ fontSize: "11px", color: "#a1a1aa", marginBottom: "6px" }}>
            {data.agencyOwnerName}
          </div>
          <div style={{ fontSize: "10px", color: "#71717a", lineHeight: "1.6" }}>
            {data.agencyAddress}<br/>
            {data.agencyNip && <>NIP: {data.agencyNip}<br/></>}
            {data.agencyEmail && <>{data.agencyEmail}<br/></>}
            {data.agencyPhone && <>tel. {data.agencyPhone}</>}
          </div>
        </div>
      </div>

      {/* ===== WSTĘP ===== */}
      <div style={{ fontSize: "10px", color: "#71717a", marginBottom: "18px", lineHeight: "1.6", textAlign: "justify" }}>
        Strony oświadczają, że niniejsza umowa została zawarta w celu określenia zasad współpracy w zakresie świadczenia usług marketingowych przez Wykonawcę na rzecz Zleceniodawcy, w tym świadczenia usług promocyjnych, reklamowych oraz doradztwa marketingowego.
      </div>

      {/* ===== §1 PRZEDMIOT UMOWY ===== */}
      <section style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <div style={{ 
            background: "linear-gradient(135deg, #ec4899, #db2777)", 
            padding: "4px 10px", 
            borderRadius: "5px", 
            fontSize: "10px", 
            fontWeight: "700", 
            color: "#fff" 
          }}>§1</div>
          <div style={{ fontSize: "12px", fontWeight: "600", color: "#fafafa" }}>Przedmiot umowy</div>
        </div>
        <div style={{ paddingLeft: "4px", color: "#a1a1aa", fontSize: "10px", lineHeight: "1.7" }}>
          <p style={{ marginBottom: "6px" }}>1. Przedmiotem niniejszej umowy jest świadczenie przez Wykonawcę usług marketingowych online:</p>
          <div style={{ paddingLeft: "12px", marginBottom: "6px" }}>
            {servicesList.map((service, i) => (
              <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "2px" }}>
                <span style={{ color: "#ec4899" }}>•</span>
                <span>{service}</span>
              </div>
            ))}
          </div>
          <p style={{ marginBottom: "2px" }}>2. Usługi świadczone będą w oparciu o materiały i dostęp do kont udostępnione przez Zleceniodawcę.</p>
          <p>3. Wykonawca zobowiązuje się realizować zadania z należytą starannością, zgodnie z najlepszą praktyką marketingową.</p>
        </div>
      </section>

      {/* ===== §2 & §3 OBOWIĄZKI ===== */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <div style={{ background: "#22c55e", padding: "3px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: "700", color: "#fff" }}>§2</div>
            <div style={{ fontSize: "11px", fontWeight: "600", color: "#fafafa" }}>Obowiązki Wykonawcy</div>
          </div>
          <div style={{ fontSize: "9px", color: "#a1a1aa", lineHeight: "1.6" }}>
            • Prowadzenie kampanii zgodnie z celami<br/>
            • Przygotowywanie kreacji reklamowych<br/>
            • Optymalizacja ustawień kampanii<br/>
            • Raport wyników do 7. dnia roboczego<br/>
            • Konsultacje i rekomendacje<br/>
            • Zachowanie poufności informacji
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <div style={{ background: "#8b5cf6", padding: "3px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: "700", color: "#fff" }}>§3</div>
            <div style={{ fontSize: "11px", fontWeight: "600", color: "#fafafa" }}>Obowiązki Zleceniodawcy</div>
          </div>
          <div style={{ fontSize: "9px", color: "#a1a1aa", lineHeight: "1.6" }}>
            • Dostęp do fanpage i konta reklamowego<br/>
            • Przekazanie materiałów (zdjęcia, logo)<br/>
            • Akceptacja kreacji w 3 dni robocze<br/>
            • Informowanie o zmianach w ofercie<br/>
            • Terminowe regulowanie płatności
          </div>
        </div>
      </div>

      {/* ===== §4 WYNAGRODZENIE ===== */}
      <section style={{ 
        background: "linear-gradient(145deg, rgba(236,72,153,0.1), rgba(236,72,153,0.02))",
        border: "1px solid rgba(236,72,153,0.25)",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ background: "linear-gradient(135deg, #ec4899, #db2777)", padding: "4px 10px", borderRadius: "5px", fontSize: "10px", fontWeight: "700", color: "#fff" }}>§4</div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "#fafafa" }}>Wynagrodzenie</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "8px", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.1em" }}>Wartość umowy</div>
            <div style={{ fontSize: "20px", fontWeight: "700", color: "#ec4899" }}>{formatAmount(totalValue)}</div>
          </div>
        </div>

        {data.paymentType === "split" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "10px" }}>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "6px", padding: "10px", textAlign: "center" }}>
              <div style={{ fontSize: "8px", color: "#71717a", textTransform: "uppercase", marginBottom: "2px" }}>Zaliczka (50%)</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#fafafa" }}>{formatAmount(advanceValue)}</div>
              <div style={{ fontSize: "8px", color: "#71717a", marginTop: "2px" }}>płatna w 3 dni od zawarcia umowy</div>
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "6px", padding: "10px", textAlign: "center" }}>
              <div style={{ fontSize: "8px", color: "#71717a", textTransform: "uppercase", marginBottom: "2px" }}>Pozostała część (50%)</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#fafafa" }}>{formatAmount(remainingValue)}</div>
              <div style={{ fontSize: "8px", color: "#71717a", marginTop: "2px" }}>płatna 7 dni po zakończeniu</div>
            </div>
          </div>
        ) : (
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "6px", padding: "10px", marginBottom: "10px" }}>
            <div style={{ fontSize: "8px", color: "#71717a", textTransform: "uppercase", marginBottom: "2px" }}>Płatność jednorazowa z góry</div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#fafafa" }}>{formatAmount(totalValue)}</div>
            <div style={{ fontSize: "8px", color: "#71717a", marginTop: "2px" }}>płatna w ciągu 3 dni od zawarcia umowy</div>
          </div>
        )}

        <div style={{ fontSize: "9px", color: "#71717a", fontStyle: "italic" }}>
          Budżet reklamowy na kampanie Meta Ads finansowany jest w całości przez Zleceniodawcę i nie stanowi części wynagrodzenia Wykonawcy.
        </div>
      </section>

      {/* ===== §5 - §8 POZOSTAŁE ===== */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "20px" }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", padding: "10px" }}>
          <div style={{ fontSize: "9px", fontWeight: "700", color: "#a78bfa", marginBottom: "4px" }}>§5 Prawa autorskie</div>
          <div style={{ fontSize: "8px", color: "#71717a", lineHeight: "1.5" }}>Materiały podlegają ochronie. Licencja niewyłączna po pełnej płatności. Konto reklamowe i wyniki są własnością Zleceniodawcy.</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", padding: "10px" }}>
          <div style={{ fontSize: "9px", fontWeight: "700", color: "#fbbf24", marginBottom: "4px" }}>§6 Terminy</div>
          <div style={{ fontSize: "8px", color: "#71717a", lineHeight: "1.5" }}>Umowa obowiązuje od wpłaty zaliczki. Przedłużenie za zgodą stron. 30-dniowy okres wypowiedzenia.</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", padding: "10px" }}>
          <div style={{ fontSize: "9px", fontWeight: "700", color: "#f87171", marginBottom: "4px" }}>§7 Rozwiązanie</div>
          <div style={{ fontSize: "8px", color: "#71717a", lineHeight: "1.5" }}>Możliwość rozwiązania przy rażącym naruszeniu. Opóźnienie płatności powyżej 14 dni. Forma pisemna lub elektroniczna.</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", padding: "10px" }}>
          <div style={{ fontSize: "9px", fontWeight: "700", color: "#2dd4bf", marginBottom: "4px" }}>§8 Postanowienia</div>
          <div style={{ fontSize: "8px", color: "#71717a", lineHeight: "1.5" }}>Zastosowanie Kodeksu cywilnego. Forma elektroniczna wiążąca. Zgodność z RODO.</div>
        </div>
      </div>

      {/* ===== PODPISY ===== */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", marginTop: "auto", paddingTop: "16px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "40px", borderBottom: "1px solid #3f3f46", marginBottom: "10px" }}></div>
          <div style={{ fontSize: "9px", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Zleceniodawca</div>
          <div style={{ fontSize: "11px", color: "#a1a1aa" }}>{data.clientOwnerName || data.clientName || ""}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "40px", borderBottom: "1px solid #3f3f46", marginBottom: "10px" }}></div>
          <div style={{ fontSize: "9px", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Agencja Marketingowa Aurine</div>
          <div style={{ fontSize: "11px", color: "#a1a1aa" }}>{data.agencyOwnerName || ""}</div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div style={{ textAlign: "center", marginTop: "20px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: "8px", color: "#52525b" }}>aurine.pl • Profesjonalny marketing dla salonów beauty</div>
      </div>
    </div>
  );
};

export default ContractPreview;
