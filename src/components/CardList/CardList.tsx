import { useState } from "react";

import {
  FaCalendarAlt,
  FaDollarSign,
  FaBox,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaChevronLeft,
  FaChevronRight,
  FaCoins,
} from "react-icons/fa";

import { FiEdit2, FiTrash } from "react-icons/fi";

import { formatToBRL } from "../../utils/formatters";

import type { Operation } from "../../models/Operation";

import * as S from "./CardList.styles";

const ITEMS_PER_PAGE = 4;

interface CardListProps {
  data: Operation[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export const CardList = ({ data, onDelete, onEdit }: CardListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = [...data].sort((a, b) => b.id - a.id);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = sortedData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      <S.CardContainer>
        {paginatedData.map((item) => (
          <S.Card key={item.id}>
            <S.EditButton
              onClick={() => onEdit(item.id)}
              title="Editar operação"
            >
              <FiEdit2 />
            </S.EditButton>

            <S.DeleteButton
              onClick={() => onDelete(item.id)}
              title="Apagar operação"
            >
              <FiTrash />
            </S.DeleteButton>
            <div className="card-column">
              <p>
                <FaCoins style={{ marginRight: "6px", color: "0059dd" }} />
                <strong>Ativo:</strong> {item.symbol}
              </p>

              <p>
                <FaCalendarAlt
                  style={{ marginRight: "6px", color: "0059dd" }}
                />
                <strong>Data:</strong>{" "}
                {new Date(item.date).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div className="card-column">
              <p>
                <FaExchangeAlt
                  style={{ marginRight: "6px", color: "0059dd" }}
                />
                <strong>Tipo:</strong>{" "}
                {item.typeOperation === 1 ? "Compra" : "Venda"}
              </p>

              <p>
                <FaDollarSign style={{ marginRight: "6px", color: "0059dd" }} />
                <strong>Preço:</strong> {formatToBRL(item.unitPrice)}
              </p>
            </div>
            <div className="card-column">
              <p>
                <FaBox style={{ marginRight: "6px", color: "0059dd" }} />
                <strong>Quantidade:</strong> {item.quantity}
              </p>

              <p>
                <FaMoneyBillWave
                  style={{ marginRight: "6px", color: "0059dd" }}
                />
                <strong>Corretagem:</strong> {formatToBRL(item.tradingFee)}
              </p>
            </div>
          </S.Card>
        ))}
      </S.CardContainer>

      {totalPages > 1 && (
        <S.PaginationContainer>
          <S.PageButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaChevronLeft style={{ marginRight: "5px" }} />
            Anterior
          </S.PageButton>

          <span style={{ margin: "0 1rem" }}>
            Página {currentPage} de {totalPages}
          </span>

          <S.PageButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Próxima
            <FaChevronRight style={{ marginLeft: "5px" }} />
          </S.PageButton>
        </S.PaginationContainer>
      )}
    </>
  );
};
