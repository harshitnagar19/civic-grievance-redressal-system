import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import image1 from "../../../assets/ourteam/image1.png";
import image2 from "../../../assets/ourteam/image2.png";
import image3 from "../../../assets/ourteam/image3.png";
import image4 from "../../../assets/ourteam/image4.png";

export default function OurTeam() {
    return (
        <ParallaxProvider >
            <div className="sticky top-1/3 z-20 text-center ">
                <h1 className="text-5xl font-bold">Think You'd Be A Good Fit?</h1>
                <h1 className="text-5xl font-bold">Come Join Our Team.</h1>
            </div>
            <div className="flex justify-center gap-3">
                <div>
                    <div className="min-h-[400vh]">
                        <div className="mt-60">
                            <Parallax speed={-250}>
                                <div className="h-[400px] w-[300px] ">
                                    <img src={image1} alt="" className="h-full w-full rounded-md" />
                                </div>
                            </Parallax>
                        </div >
                    </div>
                </div>
                <div>
                    <div className="min-h-[400vh] pt-24">
                        <div className="mt-60">
                            <Parallax speed={-40}>
                                <div className="h-[400px] w-[300px] ">
                                    <img src={image1} alt="" className="h-full w-full rounded-md" />
                                </div>
                            </Parallax>
                        </div >
                    </div>
                </div>
                <div>
                    <div className="min-h-[400vh]">
                        <div>
                            <Parallax speed={-50}>
                                <div className="h-[400px] w-[300px] ">
                                    <img src={image1} alt="" className="h-full w-full rounded-md" />
                                </div>
                            </Parallax>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="min-h-[400vh]">
                        <div className="   mt-60">
                            <Parallax speed={-250}>
                                <div className="h-[400px] w-[300px] ">
                                    <img src={image1} alt="" className="h-full w-full rounded-md" />
                                </div>
                            </Parallax>
                        </div >
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="flex justify-center gap-3">
                <div>
                    <div className="min-h-[400vh]">
                        <div className="   mt-60">
                            <Parallax speed={-250}>
                                <div className="h-[400px] w-[300px] ">
                                    <img src={image1} alt="" className="h-full w-full rounded-md" />
                                </div>
                            </Parallax>
                        </div >
                    </div>
                </div>
                <div>
                    <div className="min-h-[400vh] pt-24">
                        <div className="mt-60">
                            <Parallax speed={-40}>
                                <div className="h-[400px] w-[300px] ">
                                    <img src={image1} alt="" className="h-full w-full rounded-md" />
                                </div>
                            </Parallax>
                        </div >
                    </div>
                </div>
                <div>
                    <div className="min-h-[400vh]">
                        <div className="mt-60">
                        <Parallax speed={-405}>
                            <div className="h-[400px] w-[300px] ">
                                <img src={image1} alt="" className="h-full w-full rounded-md" />
                            </div>
                        </Parallax>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="min-h-[400vh]">
                        <div className="   mt-60">
                            <Parallax speed={-250}>
                                <div className="h-[400px] w-[300px] ">
                                    <img src={image1} alt="" className="h-full w-full rounded-md" />
                                </div>
                            </Parallax>
                        </div >
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="flex justify-center gap-3">
                <div>
                    <div className="min-h-[400vh]">
                        <div className="   mt-60">
                            <Parallax speed={-250}>
                                <div className="h-[400px] w-[300px] ">
                                    <img src={image1} alt="" className="h-full w-full rounded-md" />
                                </div>
                            </Parallax>
                        </div >
                    </div>
                </div>
                <div>
                    <div className="min-h-[400vh] pt-24">
                        <div className="mt-60">
                            <Parallax speed={-40}>
                                <div className="h-[400px] w-[300px] ">
                                    <img src={image1} alt="" className="h-full w-full rounded-md" />
                                </div>
                            </Parallax>
                        </div >
                    </div>
                </div>
                <div>
                    <div className="min-h-[400vh]">
                        <div className="mt-60">
                        <Parallax speed={-405}>
                            <div className="h-[400px] w-[300px] ">
                                <img src={image1} alt="" className="h-full w-full rounded-md" />
                            </div>
                        </Parallax>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="min-h-[400vh]">
                        <div className="   mt-60">
                            <Parallax speed={-250}>
                                <div className="h-[400px] w-[300px] ">
                                    <img src={image1} alt="" className="h-full w-full rounded-md" />
                                </div>
                            </Parallax>
                        </div >
                    </div>
                </div>
            </div>
        </ParallaxProvider>


    );
}
