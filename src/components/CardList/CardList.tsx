import { useState } from "react";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaBox,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { formatToBRL } from "../../utils/formatters";
import type { Operation } from "../../models/Operation";
import {
  CardContainer,
  Card,
  PaginationContainer,
  PageButton,
} from "./CardList.styles";

interface CardListProps {
  data: Operation[];
  onDelete: (ids: number) => void;
}

export const CardList = ({ data, onDelete }: CardListProps) => {
  const ITEMS_PER_PAGE = 3;
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
      <CardContainer>
        {paginatedData.map((item) => (
          <Card key={item.id}>
            <span
              onClick={() => onDelete(item.id)}
              style={{
                position: "absolute",
                right: "-10px",
                top: "-15px",
                background: "#ffffff",
                borderRadius: "50px",
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "#e63946",
                fontSize: "1.3rem",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
              }}
              title="Apagar operação"
            >
              <FiTrash />
            </span>
            <div className="card-column">
              <p>
                <FaCalendarAlt
                  style={{ marginRight: "6px", color: "0059dd" }}
                />
                <strong>Data:</strong>{" "}
                {new Date(item.date).toLocaleDateString("pt-BR")}
              </p>
              <p>
                <FaExchangeAlt
                  style={{ marginRight: "6px", color: "0059dd" }}
                />
                <strong>Tipo:</strong>{" "}
                {item.typeOperation === 1 ? "Compra" : "Venda"}
              </p>
            </div>
            <div className="card-column">
              <p>
                <FaDollarSign style={{ marginRight: "6px", color: "0059dd" }} />
                <strong>Preço:</strong> {formatToBRL(item.unitPrice)}
              </p>
              <p>
                <FaBox style={{ marginRight: "6px", color: "0059dd" }} />
                <strong>Quantidade:</strong> {item.quantity}
              </p>
            </div>
            <div className="card-column">
              <p>
                <FaMoneyBillWave
                  style={{ marginRight: "6px", color: "0059dd" }}
                />
                <strong>Corretagem:</strong> {formatToBRL(item.tradingFee)}
              </p>
            </div>
          </Card>
        ))}
      </CardContainer>

      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaChevronLeft style={{ marginRight: "5px" }} />
            Anterior
          </PageButton>

          <span style={{ margin: "0 1rem" }}>
            Página {currentPage} de {totalPages}
          </span>

          <PageButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Próxima
            <FaChevronRight style={{ marginLeft: "5px" }} />
          </PageButton>
        </PaginationContainer>
      )}
    </>
  );
};
