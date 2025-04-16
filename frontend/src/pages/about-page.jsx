import { PageLayout } from '../components/page-layout';

export const AboutPage = () => {
    return (
        <PageLayout>
            <div className="content-layout">
                <h1 id="page-title" className="content__title">
                    About the Model Atlas
                </h1>
                <p>
                    <br />
                    <span className="font-bold">
                        The Model Atlas is a collection of models developed and used at the Copernicus Institute of Sustainable Development at Utrecht
                        University. It showcases our modeling research, the insights these models provide, and relevant output data.
                    </span>
                    <br />
                    <br />
                    Our goal is to make our models and their data more accessible—and to foster collaboration within and beyond academia.
                    <br />
                    <br />
                    Each model has a dedicated page with a brief description, links to documentation, code, and contact details. Use keywords to filter through
                    our database and find models relevant to your needs.
                    <br />
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
            </div>
        </PageLayout>
    );
};
