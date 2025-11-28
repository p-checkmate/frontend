import React from 'react';

const TextTest: React.FC = () => {
  return (
    <div className="space-y-10 p-4">
      {/* ===========================
          텍스트 스타일 테스트
          =========================== */}
      <section>
        <h1 className="text-title3 mb-4">텍스트 스타일 테스트 (사용 예시)</h1>

        {/* title 계열 */}
        <div className="space-y-2">
          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-title1"</p>
            <p className="text-title1">text-title1 (40px)</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-title2"</p>
            <p className="text-title2">text-title2 (35px)</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-title3"</p>
            <p className="text-title3">text-title3 (30px)</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-title4"</p>
            <p className="text-title4">text-title4 (18px)</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-title5"</p>
            <p className="text-title5">text-title5 (16px)</p>
          </div>
        </div>

        {/* caption 계열 */}
        <div className="mt-4 space-y-2">
          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-caption1"</p>
            <p className="text-caption1">text-caption1 (20px)</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-caption2"</p>
            <p className="text-caption2">text-caption2 (18px)</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-caption3"</p>
            <p className="text-caption3">text-caption3 (16px)</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-caption4"</p>
            <p className="text-caption4">text-caption4 (13px)</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-caption5"</p>
            <p className="text-caption5">text-caption5 (12px)</p>
          </div>
        </div>

        {/* body 계열 */}
        <div className="mt-4 space-y-2">
          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-body1"</p>
            <p className="text-body1">text-body1 (15px)</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-body2"</p>
            <p className="text-body2">
              text-body2 (16px) - 본문에서 많이 쓸 크기
            </p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-body3"</p>
            <p className="text-body3">text-body3 (18px)</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">className="text-body4"</p>
            <p className="text-body4">text-body4 (12px)</p>
          </div>
        </div>
      </section>

      {/* ===========================
          텍스트 색상 테스트
          =========================== */}
      <section>
        <h1 className="text-title3 mb-4">텍스트 색상 테스트 (사용 예시)</h1>

        <div className="space-y-2">
          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">
              className="text-title4 text-black"
            </p>
            <p className="text-title4 text-black">text-black</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">
              className="text-title4 text-gray1"
            </p>
            <p className="text-title4 text-gray1">text-gray1</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">
              className="text-title4 text-gray2"
            </p>
            <p className="text-title4 text-gray2">text-gray2</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">
              className="text-title4 text-gray3"
            </p>
            <p className="text-title4 text-gray3">text-gray3</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">
              className="text-title4 text-yellow"
            </p>
            <p className="text-title4 text-yellow">text-yellow</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">
              className="text-title4 text-green1"
            </p>
            <p className="text-title4 text-green1">text-green1</p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-3">
            <p className="text-body4 text-gray3 mb-1">
              className="text-title4 text-green2"
            </p>
            <p className="text-title4 text-green2">text-green2</p>
          </div>
        </div>
      </section>

      {/* ===========================
          배경 색상 테스트
          =========================== */}
      <section>
        <h1 className="text-title3 mb-4">배경 색상 테스트 (사용 예시)</h1>

        <div className="space-y-3">
          <div className="rounded-md border border-gray-200 p-4 text-body2 bg-beige1">
            className="bg-beige1"
          </div>

          <div className="rounded-md border border-gray-200 p-4 text-body2 bg-beige2">
            className="bg-beige2"
          </div>

          <div className="rounded-md border border-gray-200 p-4 text-body2 bg-white">
            className="bg-white"
          </div>

          <div className="rounded-md border border-gray-200 p-4 text-body2 bg-gray1">
            className="bg-gray1"
          </div>

          <div className="rounded-md border border-gray-200 p-4 text-body2 bg-gray2">
            className="bg-gray2"
          </div>

          <div className="rounded-md border border-gray-200 p-4 text-body2 bg-gray3">
            className="bg-gray3 text-white"
          </div>

          <div className="rounded-md border border-gray-200 p-4 text-body2 bg-green1 text-white">
            className="bg-green1"
          </div>

          <div className="rounded-md border border-gray-200 p-4 text-body2 bg-green2 text-white">
            className="bg-green2"
          </div>

          <div className="rounded-md border border-gray-200 p-4 text-body2 bg-yellow">
            className="bg-yellow"
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextTest;
