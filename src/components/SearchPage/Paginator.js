import React from 'react';
import { Query } from '@apollo/client/react/components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { HOUSE_COUNT_QUERY } from '../../_lib/SearchQueries';
import Loading from '../icons/loading.svg';
import ReactPaginate from 'react-paginate';

function Paginator({ onPageChange, variables, activePage, limit }) { 
  return (
    <Query query={HOUSE_COUNT_QUERY} variables={variables}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Loading />
            </div>
          );
        if (error) {
          return <div>Error</div>;
        };

        const results = data.PortalSite.houses;

        const pageCount = Math.ceil(results.length / limit);
        return (
          <div className="bu-paginator">
            <div>
              {results.length} <FormattedMessage id="results" />
            </div>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={({ selected }) => {
                console.log("clicked");
                onPageChange(selected);
              }}
              forcePage={activePage}
              pageRangeDisplayed={5}
              breakLabel="..."
              className="bu-pagination"
              renderOnZeroPageCount={null}
              nextLabel=">"
              previousLabel="<"
            />
          </div>
        );
      }}
    </Query>
  );
}


Paginator.propTypes = {
  activePage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  variables: PropTypes.object.isRequired,
};

export default Paginator;
