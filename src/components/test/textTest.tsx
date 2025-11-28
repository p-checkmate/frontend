const textList = [
  { className: 'text-title1', label: 'text-title1 (40px)' },
  { className: 'text-title2', label: 'text-title2 (35px)' },
  { className: 'text-title3', label: 'text-title3 (30px)' },
  { className: 'text-title4', label: 'text-title4 (18px)' },
  { className: 'text-title5', label: 'text-title5 (16px)' },

  { className: 'text-caption1', label: 'text-caption1 (20px)' },
  { className: 'text-caption2', label: 'text-caption2 (18px)' },
  { className: 'text-caption3', label: 'text-caption3 (16px)' },
  { className: 'text-caption4', label: 'text-caption4 (13px)' },
  { className: 'text-caption5', label: 'text-caption5 (12px)' },

  { className: 'text-body1', label: 'text-body1 (15px)' },
  { className: 'text-body2', label: 'text-body2 (16px)' },
  { className: 'text-body3', label: 'text-body3 (18px)' },
  { className: 'text-body4', label: 'text-body4 (12px)' },
];

const TextTest = () => {
  return (
    <div>
      <h1 className="text-title3 mb-4">텍스트 스타일 테스트</h1>

      {textList.map((item) => (
        <div
          key={item.className}
          className="p-3 rounded-md bg-white border border-gray-200"
        >
          <div className={`${item.className}`}>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TextTest;
