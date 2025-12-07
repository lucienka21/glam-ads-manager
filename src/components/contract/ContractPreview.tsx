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

  const styles = {
    container: {
      width: '794px',
      height: '1123px',
      background: '#080808',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      padding: '50px',
      boxSizing: 'border-box' as const,
      display: 'flex',
      flexDirection: 'column' as const,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '28px',
      borderBottom: '2px solid #ec4899',
      marginBottom: '28px',
    },
    logo: {
      width: '52px',
      height: '52px',
      borderRadius: '10px',
    },
    title: {
      fontSize: '30px',
      fontWeight: '700',
      margin: '0',
    },
    subtitle: {
      fontSize: '11px',
      letterSpacing: '2px',
      color: '#ec4899',
      textTransform: 'uppercase' as const,
      marginBottom: '4px',
    },
    meta: {
      fontSize: '13px',
      color: 'rgba(255,255,255,0.5)',
      marginTop: '4px',
    },
    badge: {
      background: 'linear-gradient(135deg, #ec4899, #be185d)',
      padding: '14px 24px',
      borderRadius: '12px',
      textAlign: 'center' as const,
    },
    badgeLabel: {
      fontSize: '9px',
      letterSpacing: '1.5px',
      opacity: 0.85,
      marginBottom: '2px',
    },
    badgeValue: {
      fontSize: '24px',
      fontWeight: '800',
    },
    partiesRow: {
      display: 'flex',
      gap: '20px',
      marginBottom: '22px',
    },
    partyBox: {
      flex: 1,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: '12px',
      padding: '18px',
    },
    partyLabel: {
      fontSize: '10px',
      letterSpacing: '1.5px',
      fontWeight: '700',
      marginBottom: '10px',
    },
    partyName: {
      fontSize: '17px',
      fontWeight: '700',
      marginBottom: '6px',
      wordBreak: 'break-word' as const,
    },
    partyOwner: {
      fontSize: '13px',
      color: 'rgba(255,255,255,0.8)',
      marginBottom: '8px',
    },
    partyDetails: {
      fontSize: '11px',
      color: 'rgba(255,255,255,0.5)',
      lineHeight: '1.6',
    },
    section: {
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '10px',
      padding: '16px',
      marginBottom: '14px',
    },
    sectionTitle: {
      fontSize: '12px',
      fontWeight: '700',
      color: '#f472b6',
      marginBottom: '8px',
    },
    sectionText: {
      fontSize: '11px',
      color: 'rgba(255,255,255,0.7)',
      lineHeight: '1.6',
    },
    serviceTags: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '6px',
      marginTop: '10px',
    },
    serviceTag: {
      fontSize: '10px',
      background: 'rgba(236,72,153,0.15)',
      color: '#f9a8d4',
      padding: '4px 10px',
      borderRadius: '12px',
      border: '1px solid rgba(236,72,153,0.25)',
    },
    twoCol: {
      display: 'flex',
      gap: '14px',
      marginBottom: '14px',
    },
    paymentBox: {
      background: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(0,0,0,0.2))',
      border: '1px solid rgba(236,72,153,0.25)',
      borderRadius: '10px',
      padding: '16px',
      marginBottom: '14px',
    },
    paymentGrid: {
      display: 'flex',
      gap: '12px',
      marginBottom: '10px',
    },
    paymentItem: {
      flex: 1,
      background: 'rgba(0,0,0,0.35)',
      borderRadius: '8px',
      padding: '12px',
      textAlign: 'center' as const,
    },
    paymentLabel: {
      fontSize: '9px',
      color: 'rgba(255,255,255,0.45)',
      letterSpacing: '1px',
      marginBottom: '4px',
    },
    paymentValue: {
      fontSize: '20px',
      fontWeight: '800',
    },
    smallGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px',
      marginBottom: '20px',
    },
    smallBox: {
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '8px',
      padding: '10px',
    },
    smallTitle: {
      fontSize: '10px',
      fontWeight: '700',
      marginBottom: '4px',
    },
    smallText: {
      fontSize: '9px',
      color: 'rgba(255,255,255,0.5)',
      lineHeight: '1.4',
    },
    signatures: {
      marginTop: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '20px',
    },
    signatureBox: {
      width: '280px',
      textAlign: 'center' as const,
    },
    signatureLine: {
      borderTop: '2px solid',
      paddingTop: '10px',
    },
    signatureLabel: {
      fontSize: '10px',
      color: 'rgba(255,255,255,0.45)',
      letterSpacing: '1px',
      marginBottom: '4px',
    },
    signatureName: {
      fontSize: '14px',
      fontWeight: '600',
      wordBreak: 'break-word' as const,
    },
  };

  return (
    <div id="contract-preview" style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={agencyLogo} alt="Aurine" style={styles.logo} />
          <div>
            <div style={styles.subtitle}>AURINE AGENCY</div>
            <h1 style={styles.title}>Umowa Współpracy</h1>
            <div style={styles.meta}>{data.signCity || 'Miejscowość'} • {formatDate(data.signDate)}</div>
          </div>
        </div>
        <div style={styles.badge}>
          <div style={styles.badgeLabel}>WYNAGRODZENIE</div>
          <div style={styles.badgeValue}>{formatAmount(totalValue)} PLN</div>
        </div>
      </div>

      {/* PARTIES */}
      <div style={styles.partiesRow}>
        <div style={{...styles.partyBox, borderColor: 'rgba(236,72,153,0.3)'}}>
          <div style={{...styles.partyLabel, color: '#f472b6'}}>WYKONAWCA</div>
          <div style={styles.partyName}>{data.agencyName || 'Aurine Agency'}</div>
          <div style={styles.partyOwner}>{data.agencyOwnerName || '—'}</div>
          <div style={styles.partyDetails}>
            {data.agencyNip && <>NIP: {data.agencyNip}<br/></>}
            {data.agencyAddress && <>{data.agencyAddress}<br/></>}
            <span style={{color: '#f472b6'}}>{data.agencyEmail} • {data.agencyPhone}</span>
          </div>
        </div>
        <div style={{...styles.partyBox, borderColor: 'rgba(59,130,246,0.3)'}}>
          <div style={{...styles.partyLabel, color: '#60a5fa'}}>ZLECENIODAWCA</div>
          <div style={styles.partyName}>{data.clientName || '—'}</div>
          <div style={styles.partyOwner}>{data.clientOwnerName || '—'}</div>
          <div style={styles.partyDetails}>
            {data.clientNip && <>NIP: {data.clientNip}<br/></>}
            {data.clientAddress && <>{data.clientAddress}<br/></>}
            {data.clientEmail || '—'} • {data.clientPhone || '—'}
          </div>
        </div>
      </div>

      {/* §1 PRZEDMIOT UMOWY */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>§1. Przedmiot umowy</div>
        <div style={styles.sectionText}>
          Przedmiotem umowy jest świadczenie usług marketingowych online, obejmujących tworzenie i prowadzenie kampanii reklamowych Facebook/Instagram Ads, przygotowanie materiałów reklamowych, optymalizację kampanii oraz comiesięczne raportowanie wyników.
        </div>
        {data.services?.length > 0 && (
          <div style={styles.serviceTags}>
            {data.services.map(s => (
              <span key={s.id} style={styles.serviceTag}>{s.name}</span>
            ))}
          </div>
        )}
      </div>

      {/* §2 & §3 OBOWIĄZKI */}
      <div style={styles.twoCol}>
        <div style={{...styles.section, flex: 1, marginBottom: 0}}>
          <div style={{...styles.sectionTitle, color: '#34d399'}}>§2. Obowiązki Wykonawcy</div>
          <div style={styles.sectionText}>
            • Prowadzenie kampanii reklamowych<br/>
            • Przygotowywanie kreacji reklamowych<br/>
            • Comiesięczne raportowanie wyników<br/>
            • Konsultacje marketingowe
          </div>
        </div>
        <div style={{...styles.section, flex: 1, marginBottom: 0}}>
          <div style={{...styles.sectionTitle, color: '#60a5fa'}}>§3. Obowiązki Zleceniodawcy</div>
          <div style={styles.sectionText}>
            • Dostęp do fanpage i konta reklamowego<br/>
            • Dostarczenie materiałów (zdjęcia, logo)<br/>
            • Akceptacja kreacji w 3 dni robocze<br/>
            • Terminowe regulowanie płatności
          </div>
        </div>
      </div>

      {/* §4 WYNAGRODZENIE */}
      <div style={styles.paymentBox}>
        <div style={styles.sectionTitle}>§4. Wynagrodzenie i budżet reklamowy</div>
        <div style={styles.paymentGrid}>
          <div style={styles.paymentItem}>
            <div style={styles.paymentLabel}>MIESIĘCZNIE</div>
            <div style={{...styles.paymentValue, color: '#fff'}}>{formatAmount(totalValue)} PLN</div>
          </div>
          {data.paymentType === 'split' ? (
            <>
              <div style={styles.paymentItem}>
                <div style={styles.paymentLabel}>ZALICZKA</div>
                <div style={{...styles.paymentValue, color: '#f472b6'}}>{formatAmount(advanceValue)} PLN</div>
              </div>
              <div style={styles.paymentItem}>
                <div style={styles.paymentLabel}>POZOSTAŁA CZĘŚĆ</div>
                <div style={{...styles.paymentValue, color: 'rgba(255,255,255,0.6)'}}>{formatAmount(remainingValue)} PLN</div>
              </div>
            </>
          ) : (
            <div style={{...styles.paymentItem, flex: 2}}>
              <div style={styles.paymentLabel}>PŁATNOŚĆ</div>
              <div style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)'}}>Całość z góry w terminie 3 dni roboczych</div>
            </div>
          )}
        </div>
        <div style={{fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic'}}>
          Budżet reklamowy opłaca Zleceniodawca bezpośrednio do platformy reklamowej (Meta).
        </div>
      </div>

      {/* §5-10 */}
      <div style={styles.smallGrid}>
        <div style={styles.smallBox}>
          <div style={{...styles.smallTitle, color: '#a78bfa'}}>§5. Prawa autorskie</div>
          <div style={styles.smallText}>Materiały podlegają ochronie. Konto i wyniki należą do Zleceniodawcy.</div>
        </div>
        <div style={styles.smallBox}>
          <div style={{...styles.smallTitle, color: '#fbbf24'}}>§6. Wypowiedzenie</div>
          <div style={styles.smallText}>Umowa od wpłaty zaliczki. 30-dniowy okres wypowiedzenia.</div>
        </div>
        <div style={styles.smallBox}>
          <div style={{...styles.smallTitle, color: '#f87171'}}>§7. Kary umowne</div>
          <div style={styles.smallText}>Opóźnienie: 0,5%/dzień. Rozwiązanie po 14 dniach zwłoki.</div>
        </div>
        <div style={styles.smallBox}>
          <div style={{...styles.smallTitle, color: '#fb923c'}}>§8. Odpowiedzialność</div>
          <div style={styles.smallText}>Brak gwarancji wyników. Odpowiedzialność ograniczona.</div>
        </div>
        <div style={styles.smallBox}>
          <div style={{...styles.smallTitle, color: '#2dd4bf'}}>§9. RODO</div>
          <div style={styles.smallText}>Przetwarzanie danych zgodne z RODO. Ochrona danych osobowych.</div>
        </div>
        <div style={styles.smallBox}>
          <div style={{...styles.smallTitle, color: '#94a3b8'}}>§10. Postanowienia końcowe</div>
          <div style={styles.smallText}>Stosuje się KC. Umowa w 2 jednobrzmiących egzemplarzach.</div>
        </div>
      </div>

      {/* SIGNATURES */}
      <div style={styles.signatures}>
        <div style={styles.signatureBox}>
          <div style={{...styles.signatureLine, borderColor: '#ec4899'}}>
            <div style={styles.signatureLabel}>WYKONAWCA</div>
            <div style={{...styles.signatureName, color: '#f9a8d4'}}>{data.agencyOwnerName || data.agencyName || 'Aurine Agency'}</div>
          </div>
        </div>
        <div style={styles.signatureBox}>
          <div style={{...styles.signatureLine, borderColor: '#3b82f6'}}>
            <div style={styles.signatureLabel}>ZLECENIODAWCA</div>
            <div style={{...styles.signatureName, color: '#93c5fd'}}>{data.clientOwnerName || data.clientName || '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPreview;