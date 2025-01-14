export const dynamic = 'force-dynamic';
import Header from "@/components/headercom/Header";
import Footer from "@/components/Footer";
import OurJourney from "@/components/aboutuscom/OurJourney";
import call_api from "@/helper/Api";

const page = async () => {
    async function getallsupplierimages () {
        const resp = await call_api.getallsupplierimages();
        if(resp.success){
            return resp.suppliers;
        }else{return []}     
    }
    const imagesFiles = await getallsupplierimages();
    return (
        <>
            <Header />
            <OurJourney suppliers={imagesFiles} />
            <Footer />
        </>
    )
}
export default page