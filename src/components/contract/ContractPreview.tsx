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
  agencyEmail: string;
  agencyAddress: string;
  services: ServiceItem[];
}

interface ContractPreviewProps {
  data: ContractData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });
};

const formatAmount = (amount: string | number) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return "0";
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  const totalValue = parseFloat(data.contractValue) || 0;
  const advanceValue = data.paymentType === "split" ? (parseFloat(data.advanceAmount) || 0) : 0;
  const remainingValue = data.paymentType === "split" ? Math.max(0, totalValue - advanceValue) : 0;

  return (
    <div
      id="contract-preview"
      style={{
        width: '794px',
        height: '1123px',
        backgroundColor: '#0f0f0f',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '11px',
        lineHeight: '1.4',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{
        background: 'linear-gradient(to right, rgba(131, 24, 67, 0.3), #0f0f0f)',
        padding: '24px 40px',
        borderBottom: '1px solid rgba(236, 72, 153, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img 
            src={agencyLogo} 
            alt="Aurine" 
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(244, 114, 182, 0.8)', marginBottom: '2px', textTransform: 'uppercase' }}>
              Aurine Agency
            </p>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
              Umowa Współpracy
            </h1>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '9px', color: '#666', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Data zawarcia</p>
          <p style={{ fontSize: '13px', fontWeight: '600', margin: 0 }}>{formatDate(data.signDate)}</p>
          <p style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>{data.signCity || "—"}</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '20px 40px' }}>
        {/* Parties */}
        <div style={{ display: 'flex', gap: '40px', marginBottom: '16px' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '9px', color: '#ec4899', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Wykonawca</p>
            <p style={{ fontWeight: '600', marginBottom: '4px' }}>Aurine Agency</p>
            <p style={{ color: '#999', fontSize: '10px' }}>{data.agencyEmail || "kontakt@aurine.pl"}</p>
            {data.agencyAddress && <p style={{ color: '#999', fontSize: '10px' }}>{data.agencyAddress}</p>}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '9px', color: '#ec4899', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Zleceniodawca</p>
            <p style={{ fontWeight: '600', marginBottom: '4px' }}>{data.clientName || "—"}</p>
            {data.clientOwnerName && <p style={{ color: '#999', fontSize: '10px' }}>Właściciel: {data.clientOwnerName}</p>}
            {data.clientNip && <p style={{ color: '#999', fontSize: '10px' }}>NIP: {data.clientNip}</p>}
            {data.clientAddress && <p style={{ color: '#999', fontSize: '10px' }}>{data.clientAddress}</p>}
            {data.clientEmail && <p style={{ color: '#999', fontSize: '10px' }}>{data.clientEmail}</p>}
            {data.clientPhone && <p style={{ color: '#999', fontSize: '10px' }}>Tel: {data.clientPhone}</p>}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #333', marginBottom: '12px' }} />

        {/* §1 */}
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>§1. Przedmiot umowy</h2>
          <p style={{ color: '#ccc', fontSize: '10px' }}>
            Przedmiotem umowy jest świadczenie usług marketingowych online, obejmujących tworzenie i prowadzenie kampanii reklamowych Facebook/Instagram Ads, przygotowanie materiałów reklamowych, optymalizację kampanii oraz comiesięczne raportowanie wyników.
          </p>
          {data.services && data.services.length > 0 && (
            <div style={{ marginTop: '6px' }}>
              <p style={{ fontSize: '9px', color: '#888', marginBottom: '3px' }}>Usługi objęte umową:</p>
              {data.services.map((service) => (
                <p key={service.id} style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• {service.name}</p>
              ))}
            </div>
          )}
        </div>

        {/* §2 */}
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>§2. Obowiązki Wykonawcy</h2>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Prowadzenie kampanii reklamowych zgodnie z ustalonymi celami biznesowymi</p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Przygotowywanie kreacji reklamowych (grafiki, teksty)</p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Comiesięczne raportowanie wyników do 7. dnia następnego miesiąca</p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Konsultacje i doradztwo w zakresie strategii marketingowej</p>
        </div>

        {/* §3 */}
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>§3. Obowiązki Zleceniodawcy</h2>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Udostępnienie dostępu do fanpage i konta reklamowego</p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Dostarczenie materiałów (zdjęcia, opisy, logo)</p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Akceptacja kreacji reklamowych w terminie 3 dni roboczych</p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Terminowe regulowanie płatności zgodnie z umową</p>
        </div>

        {/* §4 */}
        <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '6px', border: '1px solid #333' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 'bold', color: '#ec4899', marginBottom: '6px' }}>§4. Wynagrodzenie i budżet reklamowy</h2>
          <p style={{ color: '#fff', fontSize: '10px', marginBottom: '4px' }}>
            <strong>Wynagrodzenie miesięczne:</strong> {formatAmount(data.contractValue)} PLN brutto
          </p>
          {data.paymentType === "split" ? (
            <>
              <p style={{ color: '#ccc', fontSize: '10px', marginBottom: '2px' }}>Zaliczka: {formatAmount(data.advanceAmount)} PLN płatna w terminie 3 dni od zawarcia umowy</p>
              <p style={{ color: '#ccc', fontSize: '10px', marginBottom: '4px' }}>Pozostała część: {formatAmount(remainingValue)} PLN płatna do 7. dnia następnego miesiąca</p>
            </>
          ) : (
            <p style={{ color: '#ccc', fontSize: '10px', marginBottom: '4px' }}>Płatność: Całość wynagrodzenia płatna z góry w terminie 3 dni od zawarcia umowy</p>
          )}
          <p style={{ color: '#888', fontSize: '9px', paddingTop: '6px', borderTop: '1px solid #333' }}>
            Budżet reklamowy: Opłacany bezpośrednio przez Zleceniodawcę do platformy reklamowej (Meta). Nie stanowi części wynagrodzenia Wykonawcy.
          </p>
        </div>

        {/* §5 */}
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>§5. Prawa autorskie i własność</h2>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Materiały reklamowe stworzone przez Wykonawcę podlegają ochronie prawnoautorskiej</p>
          <p style={{ color: '#fff', fontSize: '10px', paddingLeft: '10px' }}>• <strong>Konto reklamowe oraz wyniki kampanii są własnością Zleceniodawcy</strong></p>
        </div>

        {/* §6 */}
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>§6. Okres obowiązywania i wypowiedzenie</h2>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Umowa obowiązuje od dnia wpłaty zaliczki/wynagrodzenia</p>
          <p style={{ color: '#fff', fontSize: '10px', paddingLeft: '10px' }}>• <strong>Umowa może zostać rozwiązana z zachowaniem 30-dniowego okresu wypowiedzenia</strong></p>
        </div>

        {/* §7 */}
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>§7. Kary umowne</h2>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Opóźnienie płatności: odsetki 0,5% wartości zaległej kwoty za każdy dzień zwłoki</p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Niedotrzymanie terminów: kara umowna 2% miesięcznej wartości umowy</p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Prawo do rozwiązania umowy natychmiast przy opóźnieniu płatności powyżej 14 dni</p>
        </div>

        {/* §8 */}
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>§8. Odpowiedzialność</h2>
          <p style={{ color: '#fff', fontSize: '10px', paddingLeft: '10px' }}>• <strong>Wykonawca nie gwarantuje określonego poziomu wyników kampanii reklamowych</strong></p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Wyniki kampanii zależą od wielu czynników zewnętrznych niezależnych od Wykonawcy</p>
        </div>

        {/* §9 */}
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>§9. Ochrona danych osobowych (RODO)</h2>
          <p style={{ color: '#fff', fontSize: '10px', paddingLeft: '10px' }}>• <strong>Strony zobowiązują się do przetwarzania danych osobowych zgodnie z RODO</strong></p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Dane osobowe będą wykorzystywane wyłącznie w celu realizacji niniejszej umowy</p>
        </div>

        {/* §10 */}
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>§10. Postanowienia końcowe</h2>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• W sprawach nieuregulowanych zastosowanie mają przepisy Kodeksu cywilnego</p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Umowa sporządzona w formie elektronicznej jest wystarczająca dla jej ważności</p>
          <p style={{ color: '#ccc', fontSize: '10px', paddingLeft: '10px' }}>• Wszelkie zmiany umowy wymagają formy pisemnej pod rygorem nieważności</p>
        </div>

        {/* Signatures */}
        <div style={{ display: 'flex', gap: '60px', paddingTop: '20px', borderTop: '1px solid #333' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ height: '50px', borderBottom: '1px solid #555', marginBottom: '6px' }} />
            <p style={{ fontSize: '9px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Zleceniodawca</p>
            <p style={{ fontSize: '10px', color: '#999', marginTop: '2px' }}>{data.clientOwnerName || data.clientName || "—"}</p>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ height: '50px', borderBottom: '1px solid #555', marginBottom: '6px' }} />
            <p style={{ fontSize: '9px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Wykonawca</p>
            <p style={{ fontSize: '10px', color: '#999', marginTop: '2px' }}>Aurine Agency</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px 40px',
        borderTop: '1px solid #222',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={agencyLogo} alt="Aurine" style={{ width: '16px', height: '16px', objectFit: 'contain', opacity: 0.5 }} />
          <span style={{ fontSize: '9px', color: '#555' }}>aurine.pl</span>
        </div>
        <p style={{ fontSize: '9px', color: '#555' }}>
          Profesjonalny marketing dla salonów beauty
        </p>
      </div>
    </div>
  );
};