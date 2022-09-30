import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { notEmpty } from 'utilities';
import parse from 'html-react-parser';

const modalStyle: Modal.Styles | undefined = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.44)',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    position: 'fixed',
  },
  content: {
    position: 'absolute',
    background: 'white',
    borderRadius: '10px',
    padding: '1em 2em',
    margin: 'auto',
    width: '40%',
    height: 'fit-content',
    overflow: 'none',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    maxHeight: '80vh',
    overflowY: 'auto'
  },
}

const CardDetail = styled.div`
  .price-info {
    display: flex;
    justify-content: space-between;

    .amount {
      color: ${(props) => props.theme.colors.primary};
      font-weight: 700;
      font-size: 2rem;
    }
  }

  .cards {
    border: thin solid;
    border-radius: 4px;
    border-color: #e5e5e5;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .card-info {
      text-align: right;
      color: #999999;
      font-size: 15px;
    }

    .card-radio {
      cursor: pointer;
    }
  }

  form input {
    margin-right: 10px;
  }
`;

export const PaymentMethodsModal = ({ open, onClose, cards, amount, onSelect, descHtml }: IProps) => {
  const [paymentMethodId, setPaymentMethodId] = useState('');

  useEffect(() => {
    setPaymentMethodId(notEmpty(cards) ? cards[0].id : 'new');
  }, [cards]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethodId(e.target.value);
  }

  const onSubmitHandler = () => {
    onSelect(paymentMethodId);
    onClose();
  }

  const formatDate = (month: string, year: string) => {
    return `${month}/${year.substring(2)}`;
  }

  return (
    <Modal isOpen={open}
      onRequestClose={onClose}
      style={modalStyle}>
      <h5>{'Select payment card'}</h5>
      <hr />
      <CardDetail>
        <div className="price-info">
          <h6>{notEmpty(descHtml) ? parse(descHtml as string) : 'Price'}</h6>
          <div className="amount">{amount}</div>
        </div>
        <div>
          <h6>{'Pay With'}</h6>
        </div>
        <form onSubmit={onSubmitHandler}>
          {cards.map((card: any, index: any) => {
            return (
              <div className="cards" key={'pay' + index}>
                <div className="card-radio">
                  <input
                    type="radio"
                    id={'payment-method' + index}
                    name="payment-method"
                    value={card.id}
                    checked={paymentMethodId == card.id}
                    onChange={handleRadioChange} />
                  <label htmlFor={'payment-method' + index}>
                    Existing Card
                </label>
                </div>
                <div className="card-info">
                  <div>{'XXXX-XXXX-XXXX-' + card.last4}</div>
                  <div>{formatDate(card.exp_month, card.exp_year)}</div>
                </div>
              </div>
            )
          })}
          <div className="cards">
            <div>
              <input type="radio"
                name="payment-method"
                id={'payment-methodnew'}
                value={'new'}
                checked={paymentMethodId == 'new'}
                onChange={handleRadioChange} />
              <label htmlFor={'payment-methodnew'}>{'New Card'}</label>
            </div>
          </div>
          <button type="submit"
            className="text--white text--bold payment-btn">
            {'Pay'}
          </button>
        </form>
      </CardDetail>
    </Modal>
  );
}

interface IProps {
  open: boolean;
  onClose: any;
  cards: any[];
  amount: string;
  onSelect: (paymentMethodId: string) => void;
  descHtml?: string;
}