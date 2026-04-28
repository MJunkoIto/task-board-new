
// 物件一覧カード表示（propsで受け取る）
const PropertyList = ({ properties }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    {properties.length === 0 ? (
      <p style={{ color: '#6b6375', margin: '32px 0', textAlign: 'center' }}>物件がありません</p>
    ) : (
      properties.map((property) => (
        <div
          key={property.id}
          style={{
            border: '1px solid #e5e4e7',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(170,59,255,0.04)',
            padding: '20px 18px',
            background: '#fafbfc',
            textAlign: 'left',
            maxWidth: 400,
            margin: '0 auto',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#2d1b4e', margin: 0 }}>{property.name}</h2>
          <p style={{ margin: '8px 0 0 0', color: '#6b6375' }}>家賃: <span style={{ fontWeight: 500 }}>{property.price ?? property.rent}円</span></p>
          <p style={{ margin: '2px 0 0 0', color: '#6b6375' }}>エリア: <span style={{ fontWeight: 500 }}>{property.area}</span></p>
        </div>
      ))
    )}
  </div>
);

export default PropertyList;
