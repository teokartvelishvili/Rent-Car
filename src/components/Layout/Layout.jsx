import Header from "../Header/Header";

export const Layout = (props) => {
    return (
        <div>
            <Header />
            {props.children}

        </div>
    );
};

export default Layout