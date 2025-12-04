import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/button/Button";
import { CharacterCelebrate } from "@/assets";

const SignupCelebrate: React.FC = () => {
    const navigate = useNavigate();

    // 메인으로
    const handleStartClick = () => {
        navigate("/");
    };

    return (
        <div className="bg-beige1 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-[375px] px-6 flex flex-col flex-1 relative"> 
                
                {/* 텍스트 영역 */}
                <h1 className="text-title2 text-black whitespace-pre-line pt-[120px] pl-2 z-10">
                    가입을{"\n"}축하드립니다!
                </h1>

                {/* 캐릭터 이미지 */}
                <CharacterCelebrate 
                    className="absolute top-[260px] left-0 right-0 mx-auto w-[250px] max-w-full" 
                />

                {/* ===== 시작하기 버튼 ===== */}
                <div className="mt-auto pb-10 w-full z-20">
                    <Button
                        variant="solid"
                        color="green"
                        size="lg"
                        fullWidth
                        onClick={handleStartClick}
                    >
                        시작하기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignupCelebrate;