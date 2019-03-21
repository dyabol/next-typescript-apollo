import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PaginationItem, PaginationLink } from 'reactstrap';

type Props = {
  count: number;
  take: number;
  onChange: (currentPage: number) => void;
};
type State = {
  currentPage: number;
};

export default class PostsPagination extends React.Component<Props, State> {
  pagesCount: number;

  constructor(props: Props) {
    super(props);

    this.pagesCount = Math.ceil(this.props.count / this.props.take);

    this.state = {
      currentPage: 0
    };
  }

  handleClick(e: React.SyntheticEvent<any, Event>, index: number) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
    this.props.onChange(index);
  }

  render() {
    const { currentPage } = this.state;

    if (this.props.count) {
      const start = currentPage * this.props.take + 1;
      const end =
        currentPage >= this.pagesCount - 1
          ? this.props.count
          : currentPage * this.props.take + this.props.take;
      const total = this.props.count;
      return (
        <div className="pagination-wrapper">
          <div className="row">
            <div className="col-sm-12 col-md-5 pt-2">
              <FormattedMessage
                id="table_records"
                defaultMessage="Showing {start} to {end} of {total} entries"
                values={{ start, end, total }}
              />
            </div>
            <div className="col-sm-12 col-md-7 text-right">
              <nav aria-label="Page navigation" className="d-inline-block">
                <ul className="mb-0 pagination">
                  <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink
                      onClick={e => this.handleClick(e, currentPage - 1)}
                      previous
                      href=""
                    />
                  </PaginationItem>
                  {[...Array(this.pagesCount)].map((_, i) => (
                    <PaginationItem active={i === currentPage} key={i}>
                      <PaginationLink
                        onClick={e => this.handleClick(e, i)}
                        href=""
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                    <PaginationLink
                      onClick={e => this.handleClick(e, currentPage + 1)}
                      next
                      href=""
                    />
                  </PaginationItem>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
