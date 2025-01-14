export const dynamic = 'force-dynamic';
import Footer from "@/components/Footer";
import Header from "@/components/headercom/Header";
import AllProducts from "@/components/Home/AllProducts";
import FindUs from "@/components/Home/FindUs";
import Heading from "@/components/Home/Heading";
import HomeBanner from "@/components/Home/HomeBanner";
import HomeBlog from "@/components/Home/HomeBlog";
import HomeSlider from "@/components/Home/HomeSlider";
import ShopByCuisine from "@/components/Home/ShopByCuisine";
import call_api from "@/helper/Api";

async function page() {  
  async function getHomeBanners () {
    const response = await call_api.gethomebanners();
    return response;  
}
async function getAllCuisines () {
  const response = await call_api.getallcuisines();
  return response;  
}
async function getAllHomeBlogs () {
  const resp = await call_api.getallhomeblog();
  return resp;
}
const banners = await getHomeBanners();
const cuisines = await getAllCuisines();
const blogs = await getAllHomeBlogs();
  return (
    <>
    <Header/>
    <HomeSlider/>
    <FindUs/>
    <HomeBanner homeBanners = {banners}/>
    <ShopByCuisine cuisines = {cuisines}/>
    <Heading heading={'Shop By Sector'}/>
    <HomeBlog blogs = {blogs}/>
    <AllProducts/>    
    <Footer/>    
    </>    
  )
}

export default page