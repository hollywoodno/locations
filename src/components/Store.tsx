import * as React from 'react';

interface IProps {
    store: any;
}

const Store: React.SFC<IProps> = (props: IProps) => {
    return (
        <a>
            <i className='material-icons'>fastfood</i>
            {props.store.name}
        </a>
    );
};

export default Store;