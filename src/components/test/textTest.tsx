import React from 'react';

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

const textColors = [
  'text-black',
  'text-gray1',
  'text-gray2',
  'text-gray3',
  'text-yellow',
  'text-green1',
  'text-green2',
];

const bgColors = [
  'bg-beige1',
  'bg-beige2',
  'bg-white',
  'bg-gray1',
  'bg-gray2',
  'bg-gray3',
  'bg-green1',
  'bg-green2',
  'bg-yellow',
];

const TextTest: React.FC = () => {
  return (
    <div className="space-y-10 p-4">
      {/* 텍스트 스타일 테스트 */}
      <section>
        <h1 className="text-title3 mb-4">텍스트 스타일 테스트</h1>

        {textList.map(item => (
          <div
            key={item.className}
            className="mb-2 rounded-md border border-gray-200 bg-white p-3"
          >
            <div className={item.className}>{item.label}</div>
          </div>
        ))}
      </section>

      {/* 텍스트 색상 테스트 */}
      <section>
        <h1 className="text-title3 mb-4">텍스트 색상 테스트</h1>

        <div className="space-y-2">
          {textColors.map(color => (
            <div
              key={color}
              className="rounded-md border border-gray-200 bg-white p-3"
            >
              <p className={`${color} text-title4`}>{color}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 배경 색상 테스트 */}
      <section>
        <h1 className="text-title3 mb-4">배경 색상 테스트</h1>

        <div className="grid grid-cols-2 gap-3">
          {bgColors.map(bg => (
            <div
              key={bg}
              className={`flex items-center justify-center rounded-md border border-gray-200 p-4 text-body2 ${bg}`}
            >
              {bg}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TextTest;
