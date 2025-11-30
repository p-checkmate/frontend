import Header from '@/components/common/header/Header';

const HeaderTest = () => {
  const handleBack = () => alert('뒤로가기!');
  const handleLogo = () => alert('로고 클릭 → 홈 이동');
  const handleSetting = () => alert('설정 클릭!');
  const handleMore = () => alert('... 메뉴 클릭!');
  const handleMyPage = () => alert('마이페이지 이동!');

  return (
    <div className="bg-beige1 min-h-screen space-y-10 py-6">
      {/* 1) 뒤로가기만 있는 헤더 */}
      <section className="border-b border-gray1 pb-2">
        <p>
          1. 뒤로가기만 있는 헤더
        </p>
        <Header variant="back" onBackClick={handleBack} />
      </section>

      {/* 2) 뒤로가기 + 텍스트 */}
      <section className="border-b border-gray1 pb-2">
        <p>
          2. 뒤로가기 + 중앙 텍스트
        </p>
        <Header
          variant="backTitle"
          title="내가 좋아요 한 콘텐츠"
          onBackClick={handleBack}
        />
      </section>

      {/* 3) 로고 + 설정 */}
      <section className="border-b border-gray1 pb-2">
        <p>
          3. 로고 + 설정
        </p>
        <Header
          variant="logoSetting"
          onLogoClick={handleLogo}
          onSettingClick={handleSetting}
        />
      </section>

      {/* 4) 뒤로가기 + 텍스트 + ... + 드롭다운 */}
      <section className="border-b border-gray1 pb-2">
        <p>
          4. 뒤로가기 + 텍스트 + ... + 드롭다운
        </p>
        <Header
          variant="backTitleDropdown"
          title="토론 제목"
          onBackClick={handleBack}
          onMoreClick={handleMore}
        />
      </section>

      {/* 5) 로고 + 북마크 토글 */}
      <section className="border-b border-gray1 pb-2">
        <p>
          5. 로고 + 북마크 아이콘
        </p>
        <Header
          variant="logoBookmark"
          onLogoClick={handleLogo}
        />
      </section>

      {/* 6) 로고 + 마이페이지 */}
      <section className="border-b border-gray1 pb-2">
        <p>
          6. 로고 + 마이페이지 아이콘
        </p>
        <Header
          variant="logoMy"
          onLogoClick={handleLogo}
          onMyPageClick={handleMyPage}
        />
      </section>
    </div>
  );
};

export default HeaderTest;
