import { PageLayout } from '../components/page-layout';

export const AboutPage = () => {
    return (
        <PageLayout>
            <div className="content-layout">
                <h1 id="page-title" className="content__title">
                    About the Model Atlas
                </h1>
                <div className="flex ">
                    <p className="flex-1 h-full">
                        <br />
                        <span className="font-bold">
                            The Model Atlas is a collection of models developed and used at the Copernicus Institute of Sustainable Development at Utrecht
                            University. It showcases our modeling research, the insights these models provide, and relevant output data.
                        </span>
                        <br />
                        <br />
                        Our goal is to make our models and their data more accessible—and to foster collaboration within and beyond academia.
                        <br />
                        Each model has a dedicated page with a brief description, links to documentation, code, and contact details. Use keywords to filter
                        through our database and find models relevant to your needs.
                        <br />
                        The models cover a wide range of topics, from global climate change to water isotope modeling. Whether you’re a researcher, student,
                        policymaker, industry professional, you’re welcome to explore and use the Atlas.
                        <br />
                        <br />
                        For more information, contact us at{' '}
                        <a className="underline" href={'copernicus.model.atlas@gmail.com'}>
                            copernicus.model.atlas@gmail.com
                        </a>
                    </p>
                    <figure className="w-[35%] rounded-lg px-2">
                        <img
                            src={`/assets/images/ac469be0 Vening_Meineszgebouw_A_UU_Gebouw_Dick_Boetekees_20231128_40Banner website.jpg`}
                            loading="lazy"
                            alt="Vening Meineszgebouw A - Utrecht University"
                            className="w-full h-full rounded-lg"
                        />
                        <figcaption className="mt-2 caption text-center">Copernicus Institute of Sustainable Development – Utrecht University</figcaption>
                    </figure>
                </div>
            </div>
        </PageLayout>
    );
};
