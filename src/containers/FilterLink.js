import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions/filter-actions';
import { Link } from '../components/link/Link';

const mapStateToProps = (state, props) => {
    return {
        active: props.filter === state.visibilityFilter
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(props.filter))
        }
    };
};

export const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);