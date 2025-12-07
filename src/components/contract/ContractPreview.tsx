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
        background: 'linear-gradient(180deg, #0c0c0c 0%, #111111 100%)',
        color: 'white',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        padding: '40px 50px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header with logo and title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', borderBottom: '3px solid #ec4899', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={agencyLogo} alt="Aurine" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>
              {data.agencyName || 'AURINE AGENCY'}
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>
              Umowa Współpracy
            </div>
            <div style={{ fontSize: '14px', color: '#aaa', marginTop: '4px' }}>
              {data.signCity || "Miejscowość"} • {formatDate(data.signDate)}
            </div>
          </div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)', padding: '16px 28px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', marginBottom: '4px' }}>Wynagrodzenie</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>{formatAmount(data.contractValue)} PLN</div>
        </div>
      </div>

      {/* Parties - Two columns */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
        {/* Wykonawca */}
        <div style={{ flex: 1, background: 'rgba(236, 72, 153, 0.1)', border: '2px solid rgba(236, 72, 153, 0.3)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '12px', letterSpacing: '2px', color: '#f472b6', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px' }}>
            WYKONAWCA
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>{data.agencyName || 'Aurine Agency'}</div>
          <div style={{ fontSize: '14px', color: '#ddd', marginBottom: '8px' }}>{data.agencyOwnerName}</div>
          <div style={{ fontSize: '12px', color: '#999', lineHeight: '1.6' }}>
            <div>NIP: {data.agencyNip || '—'}</div>
            <div>{data.agencyAddress || '—'}</div>
            <div>{data.agencyEmail} • {data.agencyPhone}</div>
          </div>
        </div>

        {/* Zleceniodawca */}
        <div style={{ flex: 1, background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '12px', letterSpacing: '2px', color: '#60a5fa', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px' }}>
            ZLECENIODAWCA
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>{data.clientName || '—'}</div>
          <div style={{ fontSize: '14px', color: '#ddd', marginBottom: '8px' }}>{data.clientOwnerName}</div>
          <div style={{ fontSize: '12px', color: '#999', lineHeight: '1.6' }}>
            <div>NIP: {data.clientNip || '—'}</div>
            <div>{data.clientAddress || '—'}</div>
            <div>{data.clientEmail} • {data.clientPhone}</div>
          </div>
        </div>
      </div>

      {/* §1 - Przedmiot umowy */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#f472b6', marginBottom: '8px' }}>§1. Przedmiot umowy</div>
        <div style={{ fontSize: '12px', color: '#ccc', lineHeight: '1.6', marginBottom: '10px' }}>
          Przedmiotem umowy jest świadczenie usług marketingowych online, obejmujących tworzenie i prowadzenie kampanii reklamowych Facebook/Instagram Ads, przygotowanie materiałów reklamowych, optymalizację kampanii oraz comiesięczne raportowanie wyników.
        </div>
        {data.services && data.services.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {data.services.map((service) => (
              <span key={service.id} style={{ fontSize: '11px', background: 'rgba(236, 72, 153, 0.2)', color: '#f9a8d4', padding: '4px 12px', borderRadius: '20px' }}>
                {service.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* §2 & §3 - Obowiązki */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#34d399', marginBottom: '8px' }}>§2. Obowiązki Wykonawcy</div>
          <div style={{ fontSize: '11px', color: '#bbb', lineHeight: '1.7' }}>
            • Prowadzenie kampanii reklamowych<br/>
            • Przygotowywanie kreacji reklamowych<br/>
            • Comiesięczne raportowanie wyników<br/>
            • Konsultacje marketingowe
          </div>
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#60a5fa', marginBottom: '8px' }}>§3. Obowiązki Zleceniodawcy</div>
          <div style={{ fontSize: '11px', color: '#bbb', lineHeight: '1.7' }}>
            • Dostęp do fanpage i konta reklamowego<br/>
            • Dostarczenie materiałów (zdjęcia, logo)<br/>
            • Akceptacja kreacji w 3 dni robocze<br/>
            • Terminowe regulowanie płatności
          </div>
        </div>
      </div>

      {/* §4 - Wynagrodzenie */}
      <div style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(0,0,0,0.3))', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#f472b6', marginBottom: '12px' }}>§4. Wynagrodzenie i budżet reklamowy</div>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '10px' }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Miesięcznie</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'white' }}>{formatAmount(data.contractValue)} PLN</div>
          </div>
          {data.paymentType === "split" ? (
            <>
              <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Zaliczka</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#f472b6' }}>{formatAmount(advanceValue)} PLN</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Pozostała część</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#aaa' }}>{formatAmount(remainingValue)} PLN</div>
              </div>
            </>
          ) : (
            <div style={{ flex: 2, background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Płatność</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#ddd' }}>Całość z góry w terminie 3 dni roboczych</div>
            </div>
          )}
        </div>
        <div style={{ fontSize: '11px', color: '#888', fontStyle: 'italic' }}>
          Budżet reklamowy opłaca Zleceniodawca bezpośrednio do platformy reklamowej (Meta). Nie stanowi wynagrodzenia Wykonawcy.
        </div>
      </div>

      {/* §5-10 - Remaining paragraphs in compact grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px 14px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#a78bfa', marginBottom: '6px' }}>§5. Prawa autorskie</div>
          <div style={{ fontSize: '10px', color: '#999', lineHeight: '1.5' }}>
            Materiały podlegają ochronie prawnej. Konto i wyniki należą do Zleceniodawcy.
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px 14px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#fbbf24', marginBottom: '6px' }}>§6. Okres i wypowiedzenie</div>
          <div style={{ fontSize: '10px', color: '#999', lineHeight: '1.5' }}>
            Umowa obowiązuje od wpłaty zaliczki. 30-dniowy okres wypowiedzenia.
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px 14px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#f87171', marginBottom: '6px' }}>§7. Kary umowne</div>
          <div style={{ fontSize: '10px', color: '#999', lineHeight: '1.5' }}>
            Opóźnienie płatności: 0,5%/dzień. Rozwiązanie po 14 dniach zwłoki.
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px 14px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#fb923c', marginBottom: '6px' }}>§8. Odpowiedzialność</div>
          <div style={{ fontSize: '10px', color: '#999', lineHeight: '1.5' }}>
            Brak gwarancji określonych wyników. Odpowiedzialność ograniczona.
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px 14px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#2dd4bf', marginBottom: '6px' }}>§9. RODO</div>
          <div style={{ fontSize: '10px', color: '#999', lineHeight: '1.5' }}>
            Przetwarzanie danych zgodne z RODO. Ochrona danych osobowych.
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px 14px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px' }}>§10. Postanowienia końcowe</div>
          <div style={{ fontSize: '10px', color: '#999', lineHeight: '1.5' }}>
            Stosuje się przepisy KC. Umowa w 2 jednobrzmiących egz.
          </div>
        </div>
      </div>

      {/* Signatures at bottom */}
      <div style={{ position: 'absolute', bottom: '40px', left: '50px', right: '50px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '250px' }}>
          <div style={{ borderTop: '3px solid #ec4899', paddingTop: '14px' }}>
            <div style={{ fontSize: '11px', color: '#666', marginBottom: '6px' }}>Wykonawca</div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#f9a8d4' }}>{data.agencyOwnerName || data.agencyName}</div>
          </div>
        </div>
        <div style={{ width: '250px', textAlign: 'right' }}>
          <div style={{ borderTop: '3px solid #3b82f6', paddingTop: '14px' }}>
            <div style={{ fontSize: '11px', color: '#666', marginBottom: '6px' }}>Zleceniodawca</div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#93c5fd' }}>{data.clientOwnerName || data.clientName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPreview;